import {Component, inject} from '@angular/core';
import {ChatWorkspaceHeaderComponent} from "./chat-workspace-header/chat-workspace-header.component";
import {
    ChatWorkspaceMessagesWrapperComponent
} from "./chat-workspace-messages-wrapper/chat-workspace-messages-wrapper.component";
import {ActivatedRoute} from "@angular/router";
import {ChatsService} from "../../../data/services/chats.service";
import {BehaviorSubject, switchMap} from "rxjs";
import {ChatGroupedMessage} from "../../../data/interfaces/chats.interface";
import {AsyncPipe} from "@angular/common";

@Component({
    selector: 'app-chat-workspace',
    standalone: true,
    imports: [
        ChatWorkspaceHeaderComponent,
        ChatWorkspaceMessagesWrapperComponent,
        AsyncPipe,
    ],
    templateUrl: './chat-workspace.component.html',
    styleUrl: './chat-workspace.component.scss'
})
export class ChatWorkspaceComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    chatsService: ChatsService = inject(ChatsService);
    activeChat$: BehaviorSubject<ChatGroupedMessage | null> = new BehaviorSubject<ChatGroupedMessage | null>(null);

    ngOnInit() {
        this.route.params.pipe(
            switchMap(({id}) => this.chatsService.getChatById(id)),
        )
            .subscribe(chats => {
                this.activeChat$.next(chats);
            });
    }
}
