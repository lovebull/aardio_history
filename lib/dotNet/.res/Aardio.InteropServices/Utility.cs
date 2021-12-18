/*
可遵循 aardio 用户协议与 aardio 开源许可证在 aardio 程序中自由使用本组件以及本组件源码,
禁止在非 aardio 开发的程序中引用本组件的任何部份(包含但不限于本组件源码、使用此源码生成的 DLL )
*/
using System;
using System.CodeDom.Compiler;
using System.Collections;
using System.Reflection;
using System.Runtime.InteropServices;

namespace Aardio.InteropServices
{
    [ClassInterface(ClassInterfaceType.AutoDispatch), ComVisible(true)]
    public class Utility
    {
        public CCodeCompiler CreateCompiler(string provideType)
        {
            object obj = this.loadAssembly("System").CreateInstance(provideType);
            if (obj == null)
            {
                return null;
            }
            return new CCodeCompiler(obj as CodeDomProvider);
        }

        public object InvokeMember(object assemblyName, string typeName, string methodName, int invokeAttr, object args, object target)
        {
            try
            {
                Assembly assembly = assemblyName as Assembly;
                if (assembly == null)
                {
                    assembly = this.loadAssembly(assemblyName as string);
                }
                if (assembly != null)
                {

                    Type tAny = assembly.GetType(typeName);
                    if (((BindingFlags)invokeAttr & BindingFlags.CreateInstance) == BindingFlags.CreateInstance)
                    {
                        
                        if (tAny != null && tAny.IsClass)
                        {
                            return CreateInstanceByClassType(tAny, (args as ArrayList), target);
                        }

                    }

                    if (((BindingFlags)invokeAttr & BindingFlags.InvokeMethod) == BindingFlags.InvokeMethod)
                    {
                        if(tAny == null)
                        {
                            tAny = assembly.GetType(typeName + "." + methodName);
                            if (tAny != null && tAny.IsClass && ((invokeAttr & (16 | 8 | 256)) == (16 | 8 | 256)))
                            { 
                                return CreateInstanceByClassType(tAny, (args as ArrayList), target);
                            }
                        }

                        if (tAny == null) throw new MissingMethodException();
                    } 

                    return InvokeMemberByType(tAny, methodName, invokeAttr, args, target);
                }

            }
            catch (TargetInvocationException targetEx)
            {
                if (targetEx.InnerException != null)
                {
                    throw targetEx.InnerException;
                }
            }

            return null;

        }

        public object InvokeObjectMember(object target, string methodName, int invokeAttr, object args)
        {
            if (target == null)
            {
                return null;
            }

            try
            {
                return InvokeMemberByType(target.GetType(), methodName, invokeAttr, args, target);
            }
            catch (TargetInvocationException targetEx)
            {
                if (targetEx.InnerException != null)
                {
                    throw targetEx.InnerException;
                }
            }

            return null;
        }


        public object InvokeMemberByType(Type tAny, string methodName, int invokeAttr, object args, object target)
        {
            if (((BindingFlags)invokeAttr & BindingFlags.InvokeMethod) == BindingFlags.InvokeMethod)
            {
                ArrayList argArray = (args as ArrayList);
                Type[] argTypeArray = new Type[argArray.Count];
                for (int i = 0; i < argArray.Count; i++)
                {
                    argTypeArray[i] = argArray[i].GetType();
                }


                MethodInfo m = null;
                try
                {
                    m = tAny.GetMethod(methodName, (BindingFlags)invokeAttr | BindingFlags.IgnoreReturn, null, argTypeArray, null);
                }
                catch (SystemException)
                {

                }

                if (m != null)
                {
                    return m.Invoke(target, (args as ArrayList).ToArray());
                }

                MethodInfo[] ms = tAny.GetMethods((BindingFlags)invokeAttr | BindingFlags.IgnoreReturn);

                bool failed = true;
                object ret = InvokeMemberBaseMethodInfo(methodName, ms, argArray, ref failed, target);
                if (!failed)
                {
                    return ret;
                }
            }

            return tAny.InvokeMember(methodName, (BindingFlags)invokeAttr | BindingFlags.IgnoreReturn, null, target, (args as ArrayList).ToArray());
        }

        private object CreateInstanceByClassType(Type tClass, ArrayList argArray, object target) {
            Type[] argTypeArray = new Type[argArray.Count];
            for (int i = 0; i < argArray.Count; i++)
            {
                argTypeArray[i] = argArray[i].GetType();
            }

            ConstructorInfo m = null;
            try
            {
                m = tClass.GetConstructor(argTypeArray);
            }
            catch (SystemException)
            {

            }

            if (m != null)
            {
                return m.Invoke(argArray.ToArray());
            }


            ConstructorInfo[] ms = tClass.GetConstructors();

            bool failed = true;
            object ret = InvokeMemberBaseMethodInfo(".ctor", ms, argArray, ref failed, target);
            if (!failed)
            {
                return ret;
            }

            return tClass.InvokeMember("", (BindingFlags) BindingFlags.CreateInstance | BindingFlags.IgnoreReturn, null, target, argArray.ToArray());
        }

        private static bool IsNumericType(Type t)
        {
            switch (Type.GetTypeCode(t))
            {
                case TypeCode.Byte:
                case TypeCode.SByte:
                case TypeCode.UInt16:
                case TypeCode.UInt32:
                case TypeCode.UInt64:
                case TypeCode.Int16:
                case TypeCode.Int32:
                case TypeCode.Int64:
                case TypeCode.Decimal:
                case TypeCode.Double:
                case TypeCode.Single:
                    return true;
                default:
                    return false;
            }
        }

        private object InvokeMemberBaseMethodInfo(string methodName, MethodBase []ms, ArrayList argArray, ref bool failed, object target)
        {

            for (int i = 0; i < ms.Length; i++)
            {
                if ((ms[i].Name != methodName) || ms[i].IsGenericMethod) continue;

                var parameters = ms[i].GetParameters();
                if (parameters.Length == argArray.Count)
                {
                    failed = false;
                    for (int k = 0; k < parameters.Length; k++)
                    {
                        var paramType = parameters[k].ParameterType;
                        if (paramType.IsEnum)
                        {
                            paramType = Enum.GetUnderlyingType(paramType);
                        }

                        string a = paramType.Name;


                        if (!paramType.Equals(argArray[k].GetType()))
                        {
                            failed = true;
                            break;
                        }
                    }

                    if (!failed)
                    {
                        if(methodName==".ctor") return (ms[i] as ConstructorInfo).Invoke(argArray.ToArray());
                        return ms[i].Invoke(target, argArray.ToArray());
                    }
                }
            }

            for (int i = 0; i < ms.Length; i++)
            {
                if ((ms[i].Name != methodName) || ms[i].IsGenericMethod) continue;

                var parameters = ms[i].GetParameters();
                if (parameters.Length > argArray.Count)
                {
                    failed = false;
                    for (int k = 0; k < argArray.Count; k++)
                    {
                        var paramType = parameters[k].ParameterType;
                        if (paramType.IsEnum)
                        {
                            paramType = Enum.GetUnderlyingType(paramType);
                        }

                        if (!paramType.Equals(argArray[k].GetType()))
                        {
                            failed = true;
                            break;
                        }
                    }

                    ArrayList args2 = argArray.Clone() as ArrayList;
                    for (int k = argArray.Count; k < parameters.Length; k++)
                    {
                        if (!parameters[k].IsOptional)
                        {
                            failed = true;
                            break;
                        }

                        args2.Add(parameters[k].DefaultValue);
                    }

                    if (!failed)
                    {
                        if (methodName == ".ctor") return (ms[i] as ConstructorInfo).Invoke(args2.ToArray());
                        return ms[i].Invoke(target, (args2 as ArrayList).ToArray());
                    }
                }
            }
            
            for (int i = 0; i < ms.Length; i++)
            {
                if ((ms[i].Name != methodName) || ms[i].IsGenericMethod) continue;

                var parameters = ms[i].GetParameters();
                if (parameters.Length == argArray.Count)
                {
                    failed = false;
                    for (int k = 0; k < parameters.Length; k++)
                    {
                        var paramType = parameters[k].ParameterType;
                        if (paramType.IsEnum)
                        {
                            paramType = Enum.GetUnderlyingType(paramType);
                        }

                        string a = paramType.Name;


                        if (!paramType.Equals(argArray[k].GetType()))
                        {
                            var paramTypeCode = Type.GetTypeCode(paramType);
                            var argType = argArray[k].GetType();
                            var argTypeCode = Type.GetTypeCode(argType);

                            if (argTypeCode == TypeCode.Double || argTypeCode == TypeCode.Int32)
                            {

                                if (IsNumericType(paramType))
                                {
                                    argArray[k] = Convert.ChangeType(argArray[k], paramType);
                                    continue;
                                }
                            }
                            else if (paramType.IsArray && argType.IsArray)
                            {
                                var paramEleType = paramType.GetElementType();
                                var argEleType = argType.GetElementType();
                                var argEleTypeCode = Type.GetTypeCode(argEleType);

                                if ((argEleTypeCode == TypeCode.Double) && IsNumericType(paramEleType))
                                {

                                    var srcArr = (argArray[k] as double[]);
                                    var dstArr = Array.CreateInstance(paramEleType, srcArr.Length);
                                    for (int n = 0; n < srcArr.Length; n++)
                                    {
                                        dstArr.SetValue(Convert.ChangeType(srcArr[n], paramEleType), n);
                                    }

                                    argArray[k] = dstArr;
                                }

                            }

                            failed = true;
                            break;
                        }
                    }

                    if (!failed)
                    {
                        if (methodName == ".ctor") return (ms[i] as ConstructorInfo).Invoke(argArray.ToArray());
                        return ms[i].Invoke(target, argArray.ToArray());
                    }
                }
            }

            for (int i = 0; i < ms.Length; i++)
            {
                if ((ms[i].Name != methodName) || ms[i].IsGenericMethod) continue;

                var parameters = ms[i].GetParameters();
                if (parameters.Length > argArray.Count)
                {
                    failed = false;
                    for (int k = 0; k < argArray.Count; k++)
                    {
                        var paramType = parameters[k].ParameterType;
                        if (paramType.IsEnum)
                        {
                            paramType = Enum.GetUnderlyingType(paramType);
                        }

                        if (!paramType.Equals(argArray[k].GetType()))
                        {
                            failed = true;
                            break;
                        }
                    }

                    ArrayList args2 = argArray.Clone() as ArrayList;
                    for (int k = argArray.Count; k < parameters.Length; k++)
                    {
                        if (!parameters[k].IsOptional)
                        {
                            failed = true;
                            break;
                        }

                        args2.Add(parameters[k].DefaultValue);
                    }

                    if (!failed)
                    {
                        if (methodName == ".ctor") return (ms[i] as ConstructorInfo).Invoke(args2.ToArray());
                        return ms[i].Invoke(target, (args2 as ArrayList).ToArray());
                    }
                }
            }


            for (int i = 0; i < ms.Length; i++)
            {
                if (ms[i].Name == methodName && ms[i].GetParameters().Length == argArray.Count)
                {
                    if (!ms[i].IsGenericMethod)
                    {
                        failed = false;
                        if (methodName == ".ctor") return (ms[i] as ConstructorInfo).Invoke(argArray.ToArray());
                        return ms[i].Invoke(target, argArray.ToArray());
                    }
                }
            }

            for (int i = 0; i < ms.Length; i++)
            {
                if (ms[i].Name == methodName && ms[i].GetParameters().Length == argArray.Count)
                {
                    failed = false;
                    if (methodName == ".ctor") return (ms[i] as ConstructorInfo).Invoke(argArray.ToArray());
                    return ms[i].Invoke(target, argArray.ToArray());
                }
            }

            failed = true;
            return null;
        }

        public Object InvokeEnumValue(object enumType, string methodName)
        {
            return System.Enum.Parse(enumType as Type, methodName);
        }

        public Object InvokeEnumType(object assemblyName, string nameSpace, string enumTypeName)
        {
            Assembly assembly = assemblyName as Assembly;
            if (assembly == null)
            {
                assembly = this.loadAssembly(assemblyName as string);
            }
            if (assembly != null)
            {
                string fullTypeName = null;
                if (nameSpace != null)
                {
                    try
                    {
                        Type nsType = assembly.GetType(nameSpace);
                        if (nsType.IsClass)
                        {
                            fullTypeName = nameSpace + "+" + enumTypeName;
                        }
                        else
                        {
                            fullTypeName = nameSpace + "." + enumTypeName;
                        }
                    }
                    catch (SystemException)
                    {
                        fullTypeName = nameSpace + "." + enumTypeName;
                    }
                }

                Type t = assembly.GetType(fullTypeName);
                if (t.IsEnum)
                {
                    return t as object;
                }
            }
            return null;
        }


        public Object ParseEnum(object assemblyName, string nameSpace, string enumTypeName, string methodName)
        {
            Assembly assembly = assemblyName as Assembly;
            if (assembly == null)
            {
                assembly = this.loadAssembly(assemblyName as string);
            }
            if (assembly != null)
            {
                string fullTypeName = null;
                if (nameSpace != null)
                {
                    try
                    {
                        Type nsType = assembly.GetType(nameSpace);
                        if (nsType.IsClass)
                        {
                            fullTypeName = nameSpace + "+" + enumTypeName;
                        }
                        else
                        {
                            fullTypeName = nameSpace + "." + enumTypeName;
                        }
                    }
                    catch (SystemException)
                    {
                        fullTypeName = nameSpace + "." + enumTypeName;
                    }
                }

                Type t = assembly.GetType(fullTypeName);
                if (t.IsEnum)
                {
                    return System.Enum.Parse(t, methodName);
                }
            }
            return null;
        }

        public Assembly loadAssembly(string assemblyName)
        {
            try
            {
                Assembly assembly = Assembly.LoadWithPartialName(assemblyName);
                Assembly result = assembly;
                return result;
            }
            catch (SystemException)
            {
            }
            try
            {
                Assembly assembly2 = Assembly.Load(AssemblyName.GetAssemblyName(assemblyName));
                Assembly result = assembly2;
                return result;
            }
            catch (SystemException)
            {
            }
            try
            {
                Assembly assembly3 = Assembly.LoadFrom(assemblyName);
                Assembly result = assembly3;
                return result;
            }
            catch (SystemException)
            {
            }
            try
            {
                Assembly assembly4 = Assembly.LoadFile(assemblyName);
                Assembly result = assembly4;
                return result;
            }
            catch (SystemException)
            {
            }
            return null;
        }
    }
}
