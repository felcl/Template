import { createAuthenticationAdapter } from '@rainbow-me/rainbowkit';
const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    const response = await fetch('/api/nonce');
    return await response.text();
  },
  createMessage: ({ nonce, address, chainId }) => {
    return '123'
  },
  getMessageBody: ({ message }) => {
    return 'abc'
  },
  verify: async ({ message, signature }) => {
    const verifyRes = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, signature }),
    });
    return Boolean(verifyRes.ok);
  },
  signOut: async () => {
    await fetch('/api/logout');
  },
});
export default authenticationAdapter;