import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  input, OnInit,
  Renderer2,
} from '@angular/core';
import { debounceTime, fromEvent, tap } from 'rxjs';
import { PostComponent } from '../post';
import { postsActions, PostService, selectGetPosts } from '@tt/data-access/';
import { Store } from '@ngrx/store';
import { GlobalStoreService } from '@tt/data-access/';
import { PostInputComponent } from '../../ui';

@Component({
  selector: 'app-post-feed',
  standalone: true,
  imports: [PostInputComponent, PostComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss'
})
export class PostFeedComponent implements OnInit, AfterViewInit {
  private postService = inject(PostService);
  store = inject(Store);
  public feed = this.store.selectSignal(selectGetPosts);
  public isCommentInput = input(false);
  public profile = inject(GlobalStoreService).me;

  @HostListener('window:resize')
  onWindowResize() {
    this.resizeFeed();
  }

  hostElement = inject(ElementRef);
  r2 = inject(Renderer2);

  ngOnInit() {
    this.store.dispatch(postsActions.getPosts({ posts: [] }))
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

      this.postService.createPost({
        title: 'Клевый пост',
        content: postText,
        authorId: this.profile()!.id,
      }).subscribe(() => {
        this.store.dispatch(postsActions.getPosts({ posts: [] }))
      })
  }
}
