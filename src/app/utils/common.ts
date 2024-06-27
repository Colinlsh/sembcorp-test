import axios from "axios";

export const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for
  // this URL must be whitelisted in the Firebase Console.
  url: window.location.origin + "/",
  // This must be true for email link sign-in.
  handleCodeInApp: true,
};

export function timeoutPromise<T>(
  promise: Promise<T>,
  ms: string | number | undefined
) {
  const timeout = new Promise<T>((_, reject) => {
    const id = setTimeout(() => {
      clearTimeout(id);
      reject("Timed out in " + ms + "ms.");
    }, parseInt(ms as string));
  });

  return Promise.race([promise, timeout]);
}

// A helper function for handling Axios errors
export function handleAxiosError(
  error: unknown,
  genericMessage: string
): string {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return (
        error.response.data.message || error.response.data.error || "API error"
      );
    } else if (error.request) {
      return "No response from server";
    }
  }
  return genericMessage;
}
