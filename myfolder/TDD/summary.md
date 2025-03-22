step1
1. ___tests___/step1/form.test.tsx
to jest przyklad testu, na podstawie ktorego zaczyna się tworzyc testy komponentu
1. components/step1/form.tsx 
to jest przyklad pliku, ktory jest podstawiany do testu, a następnie są odpalane testy
i trzeba poprawiać komponent form, do momentu az test przejdzie
----------------
step2
1. components/step2/form.tsx 
to finalnie poprawiona wersja komponentu, ktora przechodzi testy
---------------
step3
Najpierw piszemy tutaj:
1. __tests___/step2/form.test.tsx

potem poprawiamy to:
2. components/step3/form.tsx
---------------
step 4
Najpierw piszemy tutaj:
1.__tests__/step3/form.test.tsx
potem piszemy poprawiamy to:
2. components/step4/form.tsx

-----------------
step 5
Najpierw piszemy tutaj:
1. __tests__/step5/List.test.tsx

punktem wyjscia jest
components/step5/1list.tsx ktory przerabiamy na components/step5/2list.tsx

pozostale pliki komponentu so dopasowane do siebie numerkami
-----------------
step 6
Najpierw piszemy tutaj:
1. step71ItemCard.tsx
potem piszemy tuaj
1. __tests__/1ItemCard.test.tsx

pozostale pliki beda sobie odpowiadac numerkami
------------------------
step 7
integration test --- poćwiczyć sobie pisanie czegoś takiego od zera


1.components/AppWithContex.tsx + FlowContext.tsx
2.__tests__/step6/AppWithContext.tsx
