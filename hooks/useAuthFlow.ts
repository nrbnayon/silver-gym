// hooks/useAuthFlow.ts
import { useRouter } from "next/navigation";

interface AuthFlowState {
  signupData?: Record<string, unknown>;
  businessInfo?: Record<string, unknown>;
  contactInfo?: Record<string, unknown>;
  verificationComplete?: boolean;
}

export const useAuthFlow = () => {
  const router = useRouter();

  const getAuthState = (): AuthFlowState => {
    if (typeof window === "undefined") return {};

    return {
      signupData: localStorage.getItem("signupData")
        ? JSON.parse(localStorage.getItem("signupData")!)
        : null,
      businessInfo: localStorage.getItem("businessInfo")
        ? JSON.parse(localStorage.getItem("businessInfo")!)
        : null,
      contactInfo: localStorage.getItem("contactInfo")
        ? JSON.parse(localStorage.getItem("contactInfo")!)
        : null,
      verificationComplete:
        localStorage.getItem("verification_complete") === "true",
    };
  };

  const clearAuthState = () => {
    if (typeof window === "undefined") return;

    localStorage.removeItem("signupData");
    localStorage.removeItem("businessInfo");
    localStorage.removeItem("contactInfo");
    localStorage.removeItem("verification_complete");
    localStorage.removeItem("verification_state");
  };

  const isStepComplete = (
    step: "signup" | "verification" | "business" | "contact"
  ) => {
    const state = getAuthState();

    switch (step) {
      case "signup":
        return !!state.signupData;
      case "verification":
        return state.verificationComplete;
      case "business":
        return !!state.businessInfo;
      case "contact":
        return !!state.contactInfo;
      default:
        return false;
    }
  };

  const validateStep = (requiredSteps: string[]) => {
    const allComplete = requiredSteps.every((step) =>
      isStepComplete(step as "signup" | "verification" | "business" | "contact")
    );

    if (!allComplete) {
      router.push("/sign-up");
      return false;
    }

    return true;
  };

  return {
    getAuthState,
    clearAuthState,
    isStepComplete,
    validateStep,
  };
};
