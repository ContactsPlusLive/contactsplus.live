import { z, defineCollection } from "astro:content";

const FormatsEnum = z.enum([
  "withWolf",
  "onTheGo",
  "whoseLine",
  "special",
  "community",
  "gameNight",
]);
type FormatsEnum = z.infer<typeof FormatsEnum>;

// add index signature to the dictionary
interface CrewRolesDict {
  [key: string]: string;
}

export const CrewRolesDict: CrewRolesDict = {
  host: "Host",
  cohost: "Co-host",
  cameraSwitcher: "Camera Switcher",
  editor: "Editor",
  producer: "Producer",
  director: "Director",
};

const CrewRoleEnum = z.enum([...Object.keys(CrewRolesDict)] as [
  string,
  ...string[]
]);
type CrewRoleEnum = z.infer<typeof CrewRoleEnum>;

const episodeCollection = defineCollection({
  type: "data",
  schema: z.object({
    season: z.number(),
    episode: z.number(),
    title: z.string(),
    description: z.string(),
    format: FormatsEnum,
    airDate: z.string().date(),
    duration: z.string().time(),
    ytID: z.string(),
    tags: z.array(z.string()),
    crew: z.array(
      z.object({
        name: z.string(),
        role: CrewRoleEnum.or(z.array(CrewRoleEnum)),
      })
    ),
    guests: z.array(z.string()),
  }),
});

export const collections = {
  episodes: episodeCollection,
};

export const getCrewRoles = (roles: string | string[]): string => {
  if (Array.isArray(roles)) {
    // join the roles with a comma
    return roles.map((role) => CrewRolesDict[role]).join(", ");
  }
  return CrewRolesDict[roles];
};

export const getNiceDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
