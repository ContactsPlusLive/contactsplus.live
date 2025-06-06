import { createDirectus, rest, } from '@directus/sdk';

type Global = {
    id: number;
    global_title: string;
    global_subtitle: string;
    main_hero: string;
    hero_cover: string;
    hero_wolf: string;
    global_logo: string;
    global_icon: string;
}

type People = {
    id: number;
    sort: number;
    name: string;
    blurb: string;
    discord: string;
    telegram: string;
    bsky: string;
    fediverse: string;
    website: string;
    xitter: string;
    staff: boolean;
    staff_title: string;
    portrait: string;
}

type Season = {
    id: number;
    season_num: number;
    blurb: string;
    duration_from: string;
    duration_to: string;
}

type Format = {
    id: number;
    name: string;
    blurb: string;
}

type VideosPeople = {
    id: number;
    videos_id: Video;
    people_id: People;
    role: string;
}

type Video = {
    id: number;
    status: string;
    title: string;
    published_at: 'datetime';
    format: Format;
    thumbnail: string;
    season: Season;
    episode_num: number;
    blurb: string;
    tags: string[];
    crew: VideosPeople[];
    watch_link: string;
}

type Schema = {
    global: Global;
    people: People[];
    seasons: Season[];
    formats: Format[];
    videos_people: VideosPeople[];
    videos: Video[];
}

const directus = createDirectus<Schema>('https://meta.contactsplus.live/').with(rest());

export default directus;
