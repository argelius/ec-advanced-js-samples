import { Subject, merge } from 'rxjs';
import { throttleTime, map, delay, scan } from 'rxjs/operators';

const addToast$ = new Subject();

export function addToastMessage(message) {
  addToast$.next(message);
}

const addToastMessage$ = addToast$
  .pipe(throttleTime(500))
  .pipe(map((message, idx) => ({ message, id: idx, action: 'add' })));

const removeToastMessage$ = addToastMessage$
  .pipe(delay(5000))
  .pipe(map(x => ({...x, action: 'remove'})));

export const toastMessages$ = merge(addToastMessage$, removeToastMessage$)
  .pipe(scan((acc, cur) => {
    const { action, ...rest } = cur;

    let rv = [...acc];

    if (action === 'add') {
      rv.push(rest);
    } else {
      const index = rv.findIndex(x => x.id === rest.id);

      if (index > -1) {
        rv = [...rv.slice(0, index), ...rv.slice(index + 1)];
      }
    }

    return rv;
  }, []));
