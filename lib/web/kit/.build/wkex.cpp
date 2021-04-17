#ifndef _UNICODE
	#define _UNICODE
#endif
#ifndef UNICODE
	#define UNICODE
#endif
#define WIN32_LEAN_AND_MEAN
#define _WIN32_WINNT 0x0501 
#define GET_WHEEL_DELTA_WPARAM(wParam)  ((short)HIWORD(wParam)) 

#include <windows.h>
#include <windowsx.h>
#include <stdio.h>
#include <malloc.h>
#include <memory.h>
#include <tchar.h>
#include <time.h>
#include "wke.h"

extern "C" __declspec(dllexport) BOOL __cdecl WebViewWndProc(wkeWebView *webView,HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam,int *pRetCode)
{
    bool handled = true; 
	*pRetCode = 0;
	
    switch (message)
    { 
	case WM_PAINT: {
		PAINTSTRUCT ps;
		HDC hdc;
        hdc = BeginPaint(hWnd, &ps);
        wkeSetDirty(webView,true);
        EndPaint(hWnd, &ps);
		handled = true;
        break;
	}
	case WM_ERASEBKGND:
		wkeSetDirty(webView,true);
		handled = true;
        break;	
	case WM_MOUSEMOVE:
    case WM_LBUTTONDOWN:
    case WM_MBUTTONDOWN:
    case WM_RBUTTONDOWN:
    case WM_LBUTTONDBLCLK:
    case WM_MBUTTONDBLCLK:
    case WM_RBUTTONDBLCLK:
    case WM_LBUTTONUP:
    case WM_MBUTTONUP:
    case WM_RBUTTONUP: 
        {
            if (message == WM_LBUTTONDOWN || message == WM_MBUTTONDOWN || message == WM_RBUTTONDOWN)
            {
                SetFocus(hWnd);
                SetCapture(hWnd);
            }
            else if (message == WM_LBUTTONUP || message == WM_MBUTTONUP || message == WM_RBUTTONUP)
            {
                ReleaseCapture();
            }

            int x = GET_X_LPARAM(lParam);
            int y = GET_Y_LPARAM(lParam);

            unsigned int flags = 0;

            if (wParam & MK_CONTROL)
                flags |= WKE_CONTROL;
            if (wParam & MK_SHIFT)
                flags |= WKE_SHIFT;

            if (wParam & MK_LBUTTON)
                flags |= WKE_LBUTTON;
            if (wParam & MK_MBUTTON)
                flags |= WKE_MBUTTON;
            if (wParam & MK_RBUTTON)
                flags |= WKE_RBUTTON;

            //flags = wParam;
            handled = wkeFireMouseEvent(webView,message, x, y, flags);
        }
        break;
    case WM_KEYDOWN:
        {   
            unsigned int virtualKeyCode = wParam;
            unsigned int flags = 0;
            if (HIWORD(lParam) & KF_REPEAT)
                flags |= WKE_REPEAT;
            if (HIWORD(lParam) & KF_EXTENDED)
                flags |= WKE_EXTENDED;

            //flags = HIWORD(lParam);
            handled = wkeFireKeyDownEvent(webView,virtualKeyCode, flags, false); 
        }
        break;

    case WM_KEYUP:
        {
            unsigned int virtualKeyCode = wParam;
            unsigned int flags = 0;
            if (HIWORD(lParam) & KF_REPEAT)
                flags |= WKE_REPEAT;
            if (HIWORD(lParam) & KF_EXTENDED)
                flags |= WKE_EXTENDED;

            //flags = HIWORD(lParam);
            handled = wkeFireKeyUpEvent(webView,virtualKeyCode, flags, false); 
        }
        break;

    case WM_CHAR:
        {
			unsigned int charCode = wParam;
            unsigned int flags = 0;
            if (HIWORD(lParam) & KF_REPEAT)
                flags |= WKE_REPEAT;
            if (HIWORD(lParam) & KF_EXTENDED)
                flags |= WKE_EXTENDED;

            handled = wkeFireKeyPressEvent(webView,charCode, flags, false);
        }
        break;

    case WM_CONTEXTMENU:
        {
            POINT pt;
            pt.x = GET_X_LPARAM(lParam);
            pt.y = GET_Y_LPARAM(lParam);

            if (pt.x != -1 && pt.y != -1)
                ScreenToClient(hWnd, &pt);

            unsigned int flags = 0;

            if (wParam & MK_CONTROL)
                flags |= WKE_CONTROL;
            if (wParam & MK_SHIFT)
                flags |= WKE_SHIFT;

            if (wParam & MK_LBUTTON)
                flags |= WKE_LBUTTON;
            if (wParam & MK_MBUTTON)
                flags |= WKE_MBUTTON;
            if (wParam & MK_RBUTTON)
                flags |= WKE_RBUTTON;

            handled = wkeFireContextMenuEvent(webView,pt.x, pt.y, flags);
        }
        break;

    case WM_MOUSEWHEEL:
        {
            POINT pt;
            pt.x = GET_X_LPARAM(lParam);
            pt.y = GET_Y_LPARAM(lParam);
            ScreenToClient(hWnd, &pt);

            int delta = GET_WHEEL_DELTA_WPARAM(wParam);

            unsigned int flags = 0;

            if (wParam & MK_CONTROL)
                flags |= WKE_CONTROL;
            if (wParam & MK_SHIFT)
                flags |= WKE_SHIFT;

            if (wParam & MK_LBUTTON)
                flags |= WKE_LBUTTON;
            if (wParam & MK_MBUTTON)
                flags |= WKE_MBUTTON;
            if (wParam & MK_RBUTTON)
                flags |= WKE_RBUTTON;

            //flags = wParam;
            handled = wkeFireMouseWheelEvent(webView,pt.x, pt.y, delta, flags);
        }
        break;

    case WM_SETFOCUS:
        wkeSetFocus(webView);
        break;

    case WM_KILLFOCUS:
        wkeKillFocus(webView);
        break; 
		
    case WM_IME_STARTCOMPOSITION:
        { 
            wkeRect caret = wkeGetCaretRect(webView);
			//if(! (caret.x == 0 && caret.y == 0) ){ 
				HIMC hIMC = ImmGetContext(hWnd);
				if( hIMC ){  
					CANDIDATEFORM form;
					form.dwIndex = 0;
					form.dwStyle = CFS_EXCLUDE;
					form.ptCurrentPos.x = caret.x;
					form.ptCurrentPos.y = caret.y;
					form.rcArea.top = caret.y;
					form.rcArea.bottom = caret.y + caret.h;
					form.rcArea.left = caret.x;
					form.rcArea.right = caret.x + caret.w; 
					ImmSetCandidateWindow(hIMC, &form); 
					
					COMPOSITIONFORM compositionForm;
				    ImmGetCompositionWindow(hIMC, &compositionForm);
					compositionForm.dwStyle = CFS_FORCE_POSITION;
				    compositionForm.ptCurrentPos.x = caret.x;
				    compositionForm.ptCurrentPos.y = caret.y;
				    ImmSetCompositionWindow(hIMC, &compositionForm);
					 
					ImmReleaseContext(hWnd, hIMC);
				}
			//} 
        }
	    handled = false;
        break; 
	case WM_GETDLGCODE:
		*pRetCode =  DLGC_WANTALLKEYS;
		handled = true;
		break;
	case WM_SIZE:
        wkeResize(webView,LOWORD(lParam), HIWORD(lParam));
		handled = false;
        break; 
	case WM_SETCURSOR: 
		handled = (LOWORD(lParam) == HTCLIENT);
		break;
	case WM_DESTROY:
		wkeDestroyWebView(webView);
		handled = false;
		break;
    default:
        handled = false;
        break;
    }
 
    return handled;
}