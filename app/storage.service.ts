import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

export async function set(key: string, value: any): Promise<void> {
  await Storage.set({
    key: key,
    value: JSON.stringify(value)
  });
}

export async function get(key: string): Promise<any> {
  const item = await Storage.get({ key: key });
  return JSON.parse(item.value);
}

export async function remove(key: string): Promise<void> {
  await Storage.remove({
    key: key
  });
}


@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor() { }
}
