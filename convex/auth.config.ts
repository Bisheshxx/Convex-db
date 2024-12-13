const authConfig = {
  // Assign the object to a variable
  providers: [
    {
      domain: "https://composed-beagle-54.clerk.accounts.dev/",
      applicationID: "convex",
    },
  ],
};

export { authConfig as default }; // Use named export while keeping the default export
