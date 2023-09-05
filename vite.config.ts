import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { searchForWorkspaceRoot } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	// For use in the Convex monorepo
	server: {
		fs: {
			allow: [searchForWorkspaceRoot(process.cwd()), '../../common']
		}
	}
});
