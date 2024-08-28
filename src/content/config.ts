import { z, defineCollection } from "astro:content";

// add index signature to the dictionary
interface StringDictionary {
  [key: string]: string;
}

export const FormatsDict: StringDictionary = {
  withWolf: "with Wolf Seisenbacher",
  onTheGo: "On the Go!",
  whoseLine: "Whose Driving That Value??",
  special: "Special",
  community: "Community Night",
  gameNight: "Game Night",
};

const FormatsEnum = z.enum([...Object.keys(FormatsDict)] as [
  string,
  ...string[],
]);
type FormatsEnum = z.infer<typeof FormatsEnum>;

export const CrewRolesDict: StringDictionary = {
  host: "Host",
  cohost: "Co-host",
  cameraSwitcher: "Camera Switcher",
  editor: "Editor",
  producer: "Producer",
  director: "Director",
};

const CrewRoleEnum = z.enum([...Object.keys(CrewRolesDict)] as [
  string,
  ...string[],
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
    airDate: z.date(),
    duration: z.string().time(),
    ytID: z.string(),
    tags: z.array(z.string()),
    crew: z.array(
      z.object({
        name: z.string(),
        role: CrewRoleEnum.or(z.array(CrewRoleEnum)),
      }),
    ),
    guests: z.array(z.string()).optional(),
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

export const getNiceDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
