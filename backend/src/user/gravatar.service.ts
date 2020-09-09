import { url, Options } from 'gravatar';


export class GravatarService {
  private getDefault(name: string): string {
    name = name.replace(' ', '+');
    return `https://ui-avatars.com/api/${name}/500/ddd/000`;
  }

  async get(email: string, name?: string): Promise<string> {
    const options: Options = {
      default: this.getDefault(name ?? email),
      size: '500',
      protocol: 'https'
    }
    return await url(email, options);
  }
}