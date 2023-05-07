export interface UserResponse {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: Array<{
    height?: number | null;
    url: string;
    width?: number | null;
  }>;
  product: string;
  type: string;
  uri: string;
}

interface AlbumArtist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface AlbumImage {
  height: number;
  url: string;
  width: number;
}

interface AlbumObject {
  album_group: string;
  album_type: string;
  artists: AlbumArtist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: AlbumImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface TrackArtist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface TrackExternalIds {
  isrc: string;
}

interface TrackExternalUrls {
  spotify: string;
}

interface Track {
  album: AlbumObject;
  artists: TrackArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: TrackExternalIds;
  external_urls: TrackExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface TrackItem {
  added_at: string;
  track: Track;
}

export interface SavedTracksResponse {
  href: string;
  items: TrackItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface AlbumsResponse {
  href: string;
  items: Array<{
    added_at: string;
    album: {
      album_group: string;
      album_type: string;
      artists: Array<{
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }>;
      available_markets: string[];
      external_ids: {
        upc: string;
      };
      external_urls: {
        spotify: string;
      };
      genres: string[];
      href: string;
      id: string;
      images: Array<{
        height: number;
        url: string;
        width: number;
      }>;
      label: string;
      name: string;
      popularity: number;
      release_date: string;
      release_date_precision: string;
      total_tracks: number;
      tracks: {
        href: string;
        items: Array<{
          artists: Array<{
            external_urls: {
              spotify: string;
            };
            href: string;
            id: string;
            name: string;
            type: string;
            uri: string;
          }>;
          available_markets: string[];
          disc_number: number;
          duration_ms: number;
          explicit: boolean;
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          is_local: boolean;
          name: string;
          preview_url: string | null;
          track_number: number;
          type: string;
          uri: string;
        }>;
        limit: number;
        next: string | null;
        offset: number;
        previous: string | null;
        total: number;
      };
      type: string;
      uri: string;
    };
  }>;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface PlaylistsResponse {
  href: string;
  items: {
    collaborative: boolean;
    description: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    owner: {
      display_name: string;
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      type: string;
      uri: string;
    };
    primary_color: null;
    public: boolean;
    snapshot_id: string;
    tracks: {
      href: string;
      total: number;
    };
    type: string;
    uri: string;
  }[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface FollowedArtistsResponse {
  artists: FollowedArtistsResponseObject;
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export interface FollowedArtistsResponseObject {
  items: Array<{
    external_urls: {
      spotify: string;
    };
    followers: {
      href: null;
      total: number;
    };
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }>;
  next: string | null;
  total: number;
  cursors: {
    after: string | null;
  };
  limit: number;
  href: string;
}

export interface PlaylistResponse {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    items: TrackItem[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
  type: string;
  uri: string;
}
