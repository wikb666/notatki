# Notatki z lekcji — poprawka instalacji na GitHub Pages

## Co było nie tak?
Twoje ikony są w głównym folderze repozytorium, ale poprzedni manifest i strona szukały ich w `icons/` i otrzymywały błąd 404. Service Worker też próbował je pobrać podczas instalacji, co mogło zablokować jego aktywację.

## Zrób dokładnie to
1. Rozpakuj ZIP na komputerze.
2. Na GitHubie otwórz repozytorium, w którym masz `index.html`.
3. Wgraj **wszystkie pliki z rozpakowanego ZIP-a bezpośrednio do tego samego folderu** (jak na Twoim zrzucie ekranu). Nadpisz istniejące pliki. **Nie twórz folderu `icons`** i nie wgrywaj samego ZIP-a.
4. Poczekaj na publikację w GitHub Pages.
5. Otwórz `https://elektrykgrzesiu.github.io/notatki/sprawdz-instalacje.html` i sprawdź, czy każda pozycja jest zielona.
6. Następnie otwórz `https://elektrykgrzesiu.github.io/notatki/` i w Chrome wybierz `⋮ → Dodaj do ekranu głównego → Zainstaluj`.

Wszystkie pliki są w jednym folderze:
```
index.html
manifest.webmanifest
sw.js
sprawdz-instalacje.html
icon-192.png
icon-512.png
icon-maskable-512.png
README_PL.md
```

**Dlaczego stary przycisk nie działał?** Był widoczny pomimo braku zdarzenia `beforeinstallprompt` z Chrome. Nowy przycisk pojawia się wyłącznie, gdy Chrome faktycznie udostępnia instalację. W innym przypadku pokazuje instrukcję instalacji przez menu Chrome.

**Uwaga o notatkach:** Nie czyść danych przeglądarki i nie usuwaj pamięci witryny. Aktualizacja plików na tym samym adresie nie powinna kasować zapisanych w niej notatek; dla bezpieczeństwa zrób kopię JSON przed zmianami.
