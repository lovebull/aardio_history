using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Management.Automation;
using System.Globalization;
using System.Management.Automation.Host;
using System.Management.Automation.Runspaces;
using System.Collections;

namespace PowerShellRunner
{
    public class PowerShellRunner
    {
        public static string InvokeScript(string command,bool useLocalScope)
        {
            CustomPSHost host = new CustomPSHost();

            InitialSessionState state = InitialSessionState.CreateDefault();
            state.AuthorizationManager = null;                  // Bypass PowerShell execution policy

            using (Runspace runspace = RunspaceFactory.CreateRunspace(host, state))
            {
                runspace.Open();

                using (Pipeline pipeline = runspace.CreatePipeline())
                {
                    pipeline.Commands.AddScript(command, useLocalScope);
                    pipeline.Commands[0].MergeMyResults(PipelineResultTypes.Error, PipelineResultTypes.Output);
                    pipeline.Commands.Add("out-default");

                    pipeline.Invoke();
                }
            }

            string output = ((CustomPSHostUserInterface)host.UI).Output;

            return output;
        }

        public static string InvokeCommand(string command, bool isScript, bool useLocalScope)
        {
            return InvokeCommand(command, isScript, useLocalScope, new string[0], new string[0]);
        }

        public static string InvokeCommand(string command, bool isScript, bool useLocalScope, string[] parameterNames)
        {
            return InvokeCommand(command, isScript, useLocalScope, parameterNames, new string[0]);
        }


        public static string InvokeCommand(string command, bool isScript, bool useLocalScope, string[] parameterNames, object parameterValue)
        {
            ArrayList parameterValues = (parameterValue as ArrayList);
            CustomPSHost host = new CustomPSHost();

            InitialSessionState state = InitialSessionState.CreateDefault();
            state.AuthorizationManager = null;                  // Bypass PowerShell execution policy

            using (Runspace runspace = RunspaceFactory.CreateRunspace(host, state))
            {
                runspace.Open();

                using (Pipeline pipeline = runspace.CreatePipeline())
                {
                    Command scriptCommand = new Command(command, isScript, useLocalScope);

                    for (int i = 0; i < parameterNames.Length; i++)
                    {
                        if ( i < parameterValues.Count )
                        {
                            scriptCommand.Parameters.Add(parameterNames[i], parameterValues[i]);
                        }
                        else
                        {
                            scriptCommand.Parameters.Add(parameterNames[i]);
                        }
                    }

                    scriptCommand.MergeMyResults(PipelineResultTypes.Error, PipelineResultTypes.Output);
                    pipeline.Commands.Add(scriptCommand);
                    pipeline.Commands.Add("out-default");

                    pipeline.Invoke();
                }
            }

            return ((CustomPSHostUserInterface)host.UI).Output; 
        }

        class CustomPSHost : PSHost
        {
            private Guid _hostId = Guid.NewGuid();
            private CustomPSHostUserInterface _ui = new CustomPSHostUserInterface();

            public override Guid InstanceId
            {
                get { return _hostId; }
            }

            public override string Name
            {
                get { return "ConsoleHost"; }
            }

            public override Version Version
            {
                get { return new Version(3, 0); }
            }

            public override PSHostUserInterface UI
            {
                get { return _ui; }
            }


            public override CultureInfo CurrentCulture
            {
                get { return Thread.CurrentThread.CurrentCulture; }
            }

            public override CultureInfo CurrentUICulture
            {
                get { return Thread.CurrentThread.CurrentUICulture; }
            }

            public override void EnterNestedPrompt()
            {
                throw new NotImplementedException("EnterNestedPrompt is not implemented. ");
            }

            public override void ExitNestedPrompt()
            {
                throw new NotImplementedException("ExitNestedPrompt is not implemented. ");
            }

            public override void NotifyBeginApplication()
            {
                return;
            }

            public override void NotifyEndApplication()
            {
                return;
            }

            public override void SetShouldExit(int exitCode)
            {
                return;
            }
        }

        class CustomPSHostUserInterface : PSHostUserInterface
        {
            // Replace StringBuilder with whatever your preferred output method is (e.g. a socket or a named pipe)
            private StringBuilder _sb;
            private CustomPSRHostRawUserInterface _rawUi = new CustomPSRHostRawUserInterface();

            public CustomPSHostUserInterface()
            {
                _sb = new StringBuilder();
            }

            public override void Write(ConsoleColor foregroundColor, ConsoleColor backgroundColor, string value)
            {
                _sb.Append(value);
            }

            public override void WriteLine()
            {
                _sb.Append("\n");
            }

            public override void WriteLine(ConsoleColor foregroundColor, ConsoleColor backgroundColor, string value)
            {
                _sb.Append(value + "\n");
            }

            public override void Write(string value)
            {
                _sb.Append(value);
            }

            public override void WriteDebugLine(string message)
            {
                _sb.AppendLine("DEBUG: " + message);
            }

            public override void WriteErrorLine(string value)
            {
                _sb.AppendLine("ERROR: " + value);
            }

            public override void WriteLine(string value)
            {
                _sb.AppendLine(value);
            }

            public override void WriteVerboseLine(string message)
            {
                _sb.AppendLine("VERBOSE: " + message);
            }

            public override void WriteWarningLine(string message)
            {
                _sb.AppendLine("WARNING: " + message);
            }

            public override void WriteProgress(long sourceId, ProgressRecord record)
            {
                return;
            }

            public string Output
            {
                get { return _sb.ToString(); }
            }

            public override Dictionary<string, PSObject> Prompt(string caption, string message, System.Collections.ObjectModel.Collection<FieldDescription> descriptions)
            {
                throw new NotImplementedException("Prompt is not implemented. ");
            }

            public override int PromptForChoice(string caption, string message, System.Collections.ObjectModel.Collection<ChoiceDescription> choices, int defaultChoice)
            {
                throw new NotImplementedException("PromptForChoice is not implemented. ");
            }

            public override PSCredential PromptForCredential(string caption, string message, string userName, string targetName, PSCredentialTypes allowedCredentialTypes, PSCredentialUIOptions options)
            {
                throw new NotImplementedException("PromptForCredential1 is not implemented. ");
            }

            public override PSCredential PromptForCredential(string caption, string message, string userName, string targetName)
            {
                throw new NotImplementedException("PromptForCredential2 is not implemented. ");
            }

            public override PSHostRawUserInterface RawUI
            {
                get { return _rawUi; }
            }

            public override string ReadLine()
            {
                throw new NotImplementedException("ReadLine is not implemented. ");
            }

            public override System.Security.SecureString ReadLineAsSecureString()
            {
                throw new NotImplementedException("ReadLineAsSecureString is not implemented. ");
            }
        }


        class CustomPSRHostRawUserInterface : PSHostRawUserInterface
        {
            // Warning: Setting _outputWindowSize too high will cause OutOfMemory execeptions.  I assume this will happen with other properties as well
            private Size _windowSize = new Size(120, 100);

            private Coordinates _cursorPosition = new Coordinates(0, 0);

            private int _cursorSize = 1;
            private ConsoleColor _foregroundColor = ConsoleColor.White;
            private ConsoleColor _backgroundColor = ConsoleColor.Black;

            private Size _maxPhysicalWindowSize = new Size(int.MaxValue, int.MaxValue);

            private Size _maxWindowSize = new Size(100, 100);
            private Size _bufferSize = new Size(100, 1000);
            private Coordinates _windowPosition = new Coordinates(0, 0);
            private String _windowTitle = "";

            public override ConsoleColor BackgroundColor
            {
                get { return _backgroundColor; }
                set { _backgroundColor = value; }
            }

            public override Size BufferSize
            {
                get { return _bufferSize; }
                set { _bufferSize = value; }
            }

            public override Coordinates CursorPosition
            {
                get { return _cursorPosition; }
                set { _cursorPosition = value; }
            }

            public override int CursorSize
            {
                get { return _cursorSize; }
                set { _cursorSize = value; }
            }

            public override void FlushInputBuffer()
            {
                throw new NotImplementedException("FlushInputBuffer is not implemented.");
            }

            public override ConsoleColor ForegroundColor
            {
                get { return _foregroundColor; }
                set { _foregroundColor = value; }
            }

            public override BufferCell[,] GetBufferContents(Rectangle rectangle)
            {
                throw new NotImplementedException("GetBufferContents is not implemented.");
            }

            public override bool KeyAvailable
            {
                get { throw new NotImplementedException("KeyAvailable is not implemented."); }
            }

            public override Size MaxPhysicalWindowSize
            {
                get { return _maxPhysicalWindowSize; }
            }

            public override Size MaxWindowSize
            {
                get { return _maxWindowSize; }
            }

            public override KeyInfo ReadKey(ReadKeyOptions options)
            {
                throw new NotImplementedException("ReadKey is not implemented. ");
            }

            public override void ScrollBufferContents(Rectangle source, Coordinates destination, Rectangle clip, BufferCell fill)
            {
                throw new NotImplementedException("ScrollBufferContents is not implemented");
            }

            public override void SetBufferContents(Rectangle rectangle, BufferCell fill)
            {
                throw new NotImplementedException("SetBufferContents is not implemented.");
            }

            public override void SetBufferContents(Coordinates origin, BufferCell[,] contents)
            {
                throw new NotImplementedException("SetBufferContents is not implemented");
            }

            public override Coordinates WindowPosition
            {
                get { return _windowPosition; }
                set { _windowPosition = value; }
            }

            public override Size WindowSize
            {
                get { return _windowSize; }
                set { _windowSize = value; }
            }

            public override string WindowTitle
            {
                get { return _windowTitle; }
                set { _windowTitle = value; }
            }
        }

    }
}