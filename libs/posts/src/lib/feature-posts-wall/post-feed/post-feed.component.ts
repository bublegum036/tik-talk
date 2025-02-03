import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  Renderer2,
} from '@angular/core';
import { PostInputComponent } from '../../ui';
import { PostComponent } from '../index';
import { PostService } from '../../data';
import { debounceTime, firstValueFrom, fromEvent, tap } from 'rxjs';
import { ProfileService } from '@tt/profile';
import { Post } from '../../../../../shared/src/lib/data/interfaces/post.interface';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements AfterViewInit {
  private postService = inject(PostService);
  public feed = this.postService.posts;
  public isCommentInput = input(false);
  public profile = inject(ProfileService).me;
  public post = input<Post>();

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  constructor() {
    firstValueFrom(this.postService.fetchPosts());
  }

  ngAfterViewInit() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(300),
        tap(() => this.resizeFeed())
      )
      .subscribe();
  }

  public resizeFeed(): void {
    const { top } = this.hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24 - 24;
    this.r2.setStyle(this.hostElement.nativeElement, 'height', `${height}px`);
  }

  onCreatePost(postText: string) {
    if (!postText) return;

    firstValueFrom(
      this.postService.createPost({
        title: 'Клевый пост',
        content: postText,
        authorId: this.profile()!.id,
      })
    ).then(() => {});
  }
}
