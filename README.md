# Google Identity Platform Test Phone Sign-In Utility

This TypeScript utility automates test phone number sign-in with Google Identity Platform, simplifying the process for development and testing.

**Features:**

- Automate 3 api calls to sign in with a test phone number and get the id token
- Cache refresh tokens to get a new id token once expired. 
- Profile management for different user scenarios (using JSON files)
- Copy token to clipboard

**Installation:**

1. Clone this repository: `git clone https://github.com/digidubae/google-test-phone-login.git`
2. Install Deno (if not already installed): https://docs.deno.com/runtime/manual/getting_started/installation

**Usage:**

1. **Configuration:**
    - Create a `.env` file in the project root directory and add your Google API key:

      ```
      API_KEY=your_google_api_key
      ```

      Replace `your_google_api_key` with your actual API key obtained from the Google Cloud Console.

    - Create profile files (JSON format) in the `profiles` directory. Each profile should represent a user with a unique phone number and an OTP code for sign-in. Example profile structure:

      ```json
      {
          "phoneNumber": "+15551234567",
          "otp": "123456"
      }
      ```

2. **Run the script:**
    - Navigate to the project's src directory in your terminal.
      ```
      cd src
      ```
    - Execute the following command, replacing `tony` with the desired profile filename (without the `.json` extension):

      ```bash
      deno run -A index.ts --profile tony
      ```

      - `--profile jacob`: Specifies the profile to use for sign-in (replace `jacob` with the actual filename without the '.json' extension).

      - `--debug`: Enables debug information output for troubleshooting.
      - `--clipboard`: Copies the obtained ID token to your clipboard for easy access.
      - `--noCache`: Forces refreshing the authentication token instead of using a cached one.

3. **Use the token:**

The script will update the profile files under /profiles with the idToken.  You can also pass the --clipboard argument to automatically copy the id token to your clipboard. 
