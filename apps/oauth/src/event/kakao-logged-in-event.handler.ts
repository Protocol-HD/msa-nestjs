import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import axios from 'axios';
import { KakaoLoggedInEvent } from './kakao-logged-in.event';

@EventsHandler(KakaoLoggedInEvent)
export class KakaoLoggedInEventHandler
  implements IEventHandler<KakaoLoggedInEvent>
{
  handle(event: KakaoLoggedInEvent) {
    switch (event.name) {
      case KakaoLoggedInEvent.name:
        this.kakaoLogout(event.accessToken);
        break;
      default:
        break;
    }
  }

  async kakaoLogout(accessToken: string): Promise<void> {
    const res = await axios.post(
      'https://kapi.kakao.com/v1/user/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log('Kakao logout', res.data);
  }
}
