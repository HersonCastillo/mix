import { Observable } from '../context/observable';
import { getElementId } from '../shared/unique-id';

export const deletion = (element: HTMLElement, callback: () => void) => {
  const onMutation = (
    mutationsList: MutationRecord[],
    observer: MutationObserver,
  ) => {
    if (mutationsList.length && !document.body.contains(element)) {
      callback();
      observer.disconnect();
    }
  };

  const observer = new MutationObserver(onMutation);

  observer.observe(element, {
    childList: true,
    subtree: true,
  });
};

export const render = async (
  context:
    | Observable<HTMLElement>
    | (() => HTMLElement)
    | HTMLElement
    | DocumentFragment
    | (() => DocumentFragment),
  container: HTMLElement,
) => {
  let prev: HTMLElement | null = null;

  if (context instanceof Observable) {
    const onContext = (element: HTMLElement) => {
      if (
        typeof element === 'boolean' ||
        element === null ||
        element === undefined
      ) {
        return;
      }

      if (prev && getElementId(element) === getElementId(prev)) {
        return;
      }

      if (prev && container.contains(prev)) {
        prev.replaceWith(element);
      } else if (element) {
        container.appendChild(element);
      }

      prev = element;
    };

    const subscription = context.subscribe(onContext);

    deletion(container, () => subscription.unsubscribe());
  } else {
    if (typeof context === 'function') {
      container.appendChild(context());
    } else {
      container.appendChild(context);
    }
  }
};
