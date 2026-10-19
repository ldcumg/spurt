const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  calendar: "/calendar",
  goals: "/goals",
  notes: "/notes",
  newNote: "/notes/new",
  editNote: (noteId: string | number) => `/notes/${noteId}/edit`,
  login: "/login",
  signup: "/signup",
} as const;

export default ROUTES;
