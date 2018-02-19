import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as delay from 'delay';
import { Observable } from 'rxjs/Observable';
import {
  StreamingAudioOptions,
  StreamingMedia,
  StreamingVideoOptions
} from '@ionic-native/streaming-media';

export class StreamingMediaMock extends StreamingMedia {
    private loadState$ = new BehaviorSubject(
        StreamingMedia.LoadState.MPMovieLoadStateUnknown);
    private playbackState$ = new BehaviorSubject(
        StreamingMedia.PlaybackState.MPMoviePlaybackStateStopped);

    /**
     * Streams a video
     * @param videoUrl {string} The URL of the video
     * @param options {StreamingVideoOptions} Options
     */
    playVideo(videoUrl: string, options?: StreamingVideoOptions): void {
        this.startPlaying();
    };
    /**
     * Streams an audio
     * @param audioUrl {string} The URL of the audio stream
     * @param options {StreamingAudioOptions} Options
     */
    playAudio(audioUrl: string, options?: StreamingAudioOptions): void {
        this.startPlaying();
    };
    /**
     * Stops streaming audio
     */
    stopAudio(): void {
        this.stopPlaying();
    };
    /**
     * Pauses streaming audio
     */
    pauseAudio(): void {};
    /**
     * Resumes streaming audio
     */
    resumeAudio(): void {};
    /**
     * Load State
     */
    loadState(): Promise<number> {
       return Promise.resolve(this.loadState$.getValue());
    };
    /**
     * Playback State
     */
    playbackState(): Promise<number> {
        return Promise.resolve(this.playbackState$.getValue());
    };
    /**
     * Watch
     */
    watch(event: string): Observable<number> {
        var ret$: Observable<number>;
        switch (event) {
            case StreamingMedia.Events.loadState.toString(): {
                ret$ = this.loadState$.asObservable();
                break;
            }
            case StreamingMedia.Events.playbackState.toString(): {
                ret$ = this.playbackState$.asObservable();
                break;
            }
        }

        return ret$;
    };
    unwatch(event: string): void {};

    private startPlaying() {
        delay(1000).then(() => {
            this.loadState$.next(StreamingMedia.LoadState.MPMovieLoadStatePlayable);
            return delay(1000);
        }).then(() => {
            this.loadState$.next(
                StreamingMedia.LoadState.MPMovieLoadStatePlayable |
                StreamingMedia.LoadState.MPMovieLoadStatePlaythroughOK);
        }).then(() => {
            this.playbackState$.next(
                StreamingMedia.PlaybackState.MPMoviePlaybackStatePlaying);
        });
    }
    private stopPlaying() {
        delay(10).then(() => {
            this.playbackState$.next(
                StreamingMedia.PlaybackState.MPMoviePlaybackStateStopped);
        }).then(() => {
            this.loadState$.next(
                StreamingMedia.LoadState.MPMovieLoadStateUnknown);
        });
    }
}
