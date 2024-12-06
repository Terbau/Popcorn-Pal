import type { MutableRefObject, Ref, RefCallback } from "react";

// This type is used to remove undefined from an object. This is useful when you
// want to ensure that an object is never undefined. For example, if you have an
// object that might have undefined values, you can use this type to ensure that
// the object is never undefined.
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

// This type is used to get the element type of an array. For example, if you
// have an array of strings, you can use this type to get the string type.
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

// This function is used to combine multiple refs into one ref. This is useful
// when you want to use multiple refs on the same element.
export function useCombinedRefs<T>(...refs: Ref<T>[]): RefCallback<T> {
  return (element: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        (ref as MutableRefObject<T | null>).current = element;
      }
    }
  };
}
