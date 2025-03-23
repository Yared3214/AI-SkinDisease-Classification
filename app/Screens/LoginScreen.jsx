import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* User Login Title */}
      <Text style={styles.title}>
        <FontAwesome name="user" size={18} color="#4F4F4F" />{" "}
        <Text style={styles.titleText}>User Login</Text>
      </Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#A9A9A9"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Forgot Password & Create Account */}
      <View style={styles.linkContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Create Account</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Social Login */}
      <Text style={styles.socialText}>Login with Social Media</Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="google" size={24} color="#DB4437" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#4F4F4F",
  },
  titleText: {
    color: "#4F4F4F",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingLeft: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  link: {
    color: "#4F8A8B",
    fontSize: 14,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#6BA292",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  socialText: {
    fontSize: 14,
    color: "#4F4F4F",
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  socialButton: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 50,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});


// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const validateEmail = (text) => {
//     setEmail(text);
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setEmailError(emailRegex.test(text) ? "" : "Invalid email format");
//   };

//   const validatePassword = (text) => {
//     setPassword(text);
//     setPasswordError(text.length >= 8 ? "" : "Password must be at least 8 characters");
//   };

//   return (
//     <View style={styles.container}>
//       {/* Logo & Title */}
//       <Text style={styles.title}>
//         <MaterialCommunityIcons name="hospital-building" size={24} color="blue" />
//         {"  "}AI Skin Diagnosis
//       </Text>

//       {/* Email Input */}
//       <Text style={styles.label}>Email Address</Text>
//       <View style={styles.inputContainer}>
//         <MaterialCommunityIcons name="email" size={20} color="blue" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your email"
//           keyboardType="email-address"
//           value={email}
//           onChangeText={validateEmail}
//         />
//       </View>
//       {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

//       {/* Password Input */}
//       <Text style={styles.label}>Password</Text>
//       <View style={styles.inputContainer}>
//         <MaterialCommunityIcons name="lock" size={20} color="blue" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your password"
//           secureTextEntry={!showPassword}
//           value={password}
//           onChangeText={validatePassword}
//         />
//         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//           <MaterialCommunityIcons
//             name={showPassword ? "eye-off" : "eye"}
//             size={20}
//             color="blue"
//             style={styles.icon}
//           />
//         </TouchableOpacity>
//       </View>
//       {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

//       {/* Forgot Password */}
//       <TouchableOpacity>
//         <Text style={styles.forgotPassword}>Forgot Password?</Text>
//       </TouchableOpacity>

//       {/* Sign In Button */}
//       <TouchableOpacity style={styles.signInButton}>
//         <Text style={styles.signInText}>SIGN IN</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     paddingHorizontal: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 30,
//     color: "#000",
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: "600",
//     marginBottom: 5,
//   },
//   inputContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 5,
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     fontSize: 16,
//   },
//   icon: {
//     marginRight: 10,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   forgotPassword: {
//     color: "blue",
//     textAlign: "right",
//     marginBottom: 20,
//     fontSize: 14,
//   },
//   signInButton: {
//     backgroundColor: "#007AFF",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   signInText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });

// export default LoginScreen;
