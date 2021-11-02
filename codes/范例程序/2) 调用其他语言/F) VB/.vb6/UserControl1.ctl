VERSION 5.00
Begin VB.UserControl UserControl1 
   ClientHeight    =   3600
   ClientLeft      =   0
   ClientTop       =   0
   ClientWidth     =   4800
   ScaleHeight     =   3600
   ScaleWidth      =   4800
   Begin VB.Image Image1 
      Height          =   3615
      Left            =   0
      Stretch         =   -1  'True
      Top             =   0
      Width           =   4815
   End
End
Attribute VB_Name = "UserControl1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = True
Dim TestPropertyValue As Integer

Public Event OnImageClick(ByRef TestPropertyValue As Integer)

Private Sub Image1_Click()
    RaiseEvent OnImageClick(TestPropertyValue)
End Sub


Private Sub UserControl_Resize()
    Image1.Width = UserControl.Width
    Image1.Height = UserControl.Height
End Sub

Public Property Get TestProperty(Param As Integer) As Integer
    TestProperty = TestPropertyValue + Param
End Property

Public Property Let TestProperty(Param As Integer, ByVal v As Integer)
    TestPropertyValue = v - Param
End Property


Public Property Let Picture(ByVal pic As Variant)
    Image1.Picture = pic
End Property


Public Function Add(ByVal a As Integer, ByVal b As Integer)
   Add = a + b
End Function
