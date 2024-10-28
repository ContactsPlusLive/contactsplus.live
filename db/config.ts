import { defineDb, defineTable, column } from "astro:db";

const Episode = defineTable({
  columns: {
    id: column.number({ primaryKey: true, unique: true }),
    season: column.number(),
    episode: column.number(),
    title: column.text(),
    description: column.text(),
    format: column.text(),
    airDate: column.date(),
    duration: column.number(),
    ytID: column.text(),
  },
});

const EpisodeTags = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    episodeID: column.number({ references: () => Episode.columns.id }),
    tag: column.text(),
  },
});

const People = defineTable({
  columns: {
    id: column.number({ primaryKey: true, unique: true }),
    slug: column.text(),
    name: column.text({ unique: true }),
    bio: column.text({ optional: true }),
    orgRole: column.text({ optional: true }),
    steamID: column.text({ optional: true }),
  },
});

const EpisodePeople = defineTable({
  columns: {
    id: column.number({ primaryKey: true, unique: true }),
    episodeID: column.number({ references: () => Episode.columns.id }),
    peopleID: column.number({ references: () => People.columns.id }),
    type: column.text(),
    role: column.text({ optional: true }),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {},
});
