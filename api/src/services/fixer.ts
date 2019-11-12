import fixer from 'fixer-api';

fixer.set({ accessKey: process.env.FIXER_API_KEY });

export default fixer;
