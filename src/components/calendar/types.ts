export type Week = [
  sunday: Date,
  monday: Date,
  tuesday: Date,
  wednesday: Date,
  thursday: Date,
  friday: Date,
  saturday: Date,
];

export type CalendarWeeks = [
  twoWeeksBefore: Week,
  previousWeek: Week,
  currentWeek: Week,
  nextWeek: Week,
  twoWeeksAfter: Week,
];
