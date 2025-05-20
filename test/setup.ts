import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
<<<<<<< HEAD
import * as matcher from '@testing-library/jest-dom/matchers';

expect.extend(matcher);
=======
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
>>>>>>> c187bbb (feat: initialize the app)

afterEach(() => {
	cleanup();
});
