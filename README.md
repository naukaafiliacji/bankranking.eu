# BankRanking Europe — wydanie przygotowane do Kwanko

Wydanie: 21 października 2026 r. Dane kont ES zweryfikowano 20 października; wyróżnienie N26 sprawdzono ponownie 21 października. Statyczna strona HTML/CSS/JavaScript, bez zależności wymaganych na hostingu.

## Zawartość

- `/es/banking/`: porównanie sześciu konkretnych kont osobistych w Hiszpanii, z opłatami, warunkami, źródłami, datą sprawdzenia i porównaniem do trzech kont.
- `/espanol/`: hiszpańska strona wejściowa, poradniki, metodologia, kontakt oraz informacje o afiliacji, prywatności i cookies.
- Pozostałe kategorie ES oraz listy PL/IT są oznaczone jako katalogi referencyjne. Starsze dane PL/IT pochodzą z 13 sierpnia 2026 r.; zmiana kodu nie stanowi ponownej weryfikacji tych taryf.
- Analityka GA4 uruchamia się po zgodzie. Ustawienia są dostępne z przycisku cookies; newsletter Brevo ma osobną zgodę.

## Aktualizacja danych

1. Edytuj źródłowy plik `assets/data/multi-ranking-data.json`.
2. Sprawdź zmieniane warunki w oficjalnych dokumentach banku. Uzupełnij właściwe źródła i rzeczywistą datę weryfikacji produktu. Brak danych zapisuj jako `null`, nie jako zero.
3. W katalogu głównym tej strony uruchom:

   ```text
   node scripts/build-data.cjs
   ```

4. Skrypt odtwarza `assets/js/multi-ranking-data.js` oraz trzy strony `/es/{banking,saving,investing}/`. Wgraj również te wygenerowane pliki.
5. Sprawdź zmienione konto, filtry, porównanie oraz źródła przed publikacją.

Node jest potrzebny do przebudowy po edycji danych, nie do wyświetlania strony na hostingu. Pliku `assets/js/multi-ranking-data.js` nie należy edytować ręcznie.

Promocje mają osobne terminy ważności. Interfejs ocenia je według daty w strefie Europe/Madrid i wygasza po zapisanym terminie. Kwoty promocyjne nie są odejmowane od kosztu utrzymania konta. Koszt podstawowy obejmuje tylko wyraźnie wskazane składniki; opcjonalna karta fizyczna i operacje są opisane osobno.

## Linki i publikacja

Linki prowadzą do oficjalnych stron banków, dopóki wydawca nie otrzyma zatwierdzonego linku konkretnej kampanii. Po indywidualnej akceptacji można uzupełnić `affiliateUrl` odpowiedniego produktu i ponownie wykonać przebudowę. Należy zachować oficjalne źródła i daty sprawdzenia.

Na hosting publikuje się zawartość tego katalogu: `index.html`, `assets/`, podkatalogi i pozostałe pliki. Zachowaj strukturę adresów oraz istniejący `CNAME`, jeśli domena nadal korzysta z tej konfiguracji.

Kod i dane przygotowano do publikacji; dostarczenie paczki nie oznacza jej automatycznego opublikowania ani akceptacji Kwanko. Przyjęcie do sieci i dopuszczenie do kampanii banku są osobnymi decyzjami.

## Wiadomości i wygląd

- `/news/`: 15 angielskich artykułów o wydarzeniach od lipca do października 2026 r. Daty wydarzeń i napisania są oddzielone.
- Edycja wiadomości: `assets/data/news.json`, następnie `node scripts/build-news.cjs`.
- Kompaktowy wygląd porównania ES: `assets/css/es-refined.css`; logika i zweryfikowane źródła pozostają wspólne.
- Wyróżniona oferta N26 na angielskiej stronie głównej jest informacją redakcyjną ze zwykłą taryfą. Aktualizując dane N26, zaktualizuj także ten blok w `index.html`.
