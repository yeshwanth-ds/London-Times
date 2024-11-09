import React from "react";
import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="space-y-3 mt-6">
      {criteria.map((item) => (
        <div key={item.label} className="flex items-center text-sm">
          {item.met ? (
            <Check className="w-5 h-5 text-green-500 mr-3" />
          ) : (
            <X className="w-5 h-5 text-red-500 mr-3" />
          )}
          <span className={item.met ? "text-green-600" : "text-red-600"}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++; // Check for minimum length
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++; // Check for both cases
    if (pass.match(/\d/)) strength++; // Check for numbers
    if (pass.match(/[^a-zA-Z\d]/)) strength++; // Check for special characters
    return strength;
  };

  const strength = getStrength(password);

  const getColor = (strength) => {
    if (strength === 0) return "bg-red-500"; // Very Weak
    if (strength === 1) return "bg-yellow-400"; // Weak
    if (strength === 2) return "bg-yellow-500"; // Fair
    if (strength === 3) return "bg-green-400"; // Good
    return "bg-green-600"; // Strong
  };

  const getStrengthText = (strength) => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Password Strength
      </h2>

      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-600">Password Strength</span>
        <span className="text-sm text-gray-600">{getStrengthText(strength)}</span>
      </div>

      <div className="flex space-x-1 mb-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-1 w-1/4 rounded-full transition-colors duration-300 ${index < strength ? getColor(strength) : "bg-gray-300"}`}
          />
        ))}
      </div>

      <PasswordCriteria password={password} />
    </div>
  );
};

export default PasswordStrengthMeter;
