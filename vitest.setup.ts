import { mockServer } from "@/mocks";
import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";

beforeAll(() => mockServer.listen());

afterEach(() => mockServer.resetHandlers());

afterAll(() => mockServer.close());
