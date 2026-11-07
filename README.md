# BankRanking Europe — wydanie aktualizacyjne 1 listopada 2026

Wydanie: 1 listopada 2026 r. Dane kont ES zweryfikowano wcześniej 20 października; ta aktualizacja nie zmienia niezweryfikowanych taryf produktowych. Zaktualizowano stronę główną, bieżące wiadomości oraz treść poradnikową kategorii. Statyczna strona HTML/CSS/JavaScript, bez zależności wymaganych na hostingu.

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

- `/news/`: 18 angielskich artykułów o wydarzeniach od lipca do października 2026 r. Daty wydarzeń i napisania są oddzielone. Najnowsze wpisy dotyczą decyzji EBC z 29 października oraz wydarzeń bankowych z 30 października.
- Edycja wiadomości: `assets/data/news.json`, następnie `node scripts/build-news.cjs`.
- Kompaktowy wygląd porównania ES: `assets/css/es-refined.css`; logika i zweryfikowane źródła pozostają wspólne.
- Sekcja HOT OFFER na stronie głównej pokazuje promocję BBVA Cuenta Online Sin Comisiones z kodem PLAN1060, sprawdzoną 1 listopada 2026 r. Blok jest odtworzony także na stronach wejściowych PL/IT/ES.

## Wersja PRO — baza z 21 października

- Nowe karty porównania ES: `assets/css/accounts-pro.css`; wspólny wygląd katalogów PL/IT: `assets/css/reference-pro.css`.
- Prawdziwe lokalne logotypy w `assets/logos/verified/` i ich źródła w `sources.json`.
- W danych `display` są krótkie opisy karty i bankomatów. Przy zmianie warunków zaktualizuj zarówno skróty, jak i pełne opisy.
- Ustawienia zgód usunięto ze stopek; otwiera je dyskretna ikona prywatności w rogu, a także przycisk na stronie polityki cookies.


## Aktualizacja 1 listopada 2026

- HOT OFFER: BBVA Spain, kod `PLAN1060`, termin wskazany przez BBVA do 10 listopada 2026 r.; szczegółowe warunki są linkowane do oficjalnej strony banku.
- Banking news: dodano trzy nowe materiały z 29–30 października 2026 r.; archiwum obejmuje teraz 18 artykułów.
- Rozszerzono 19 głównych stron kategorii, w tym `savings`, `fixed-term-deposits`, `business-savings`, `child-savings`, `savings-rates` oraz strony rachunków i inwestowania.
- Dodano analogiczne sekcje wyjaśniające na 57 stronach lokalnych w `/polski/`, `/espanol/` i `/italiano/`.
- Nie uzupełniano niezweryfikowanych opłat, oprocentowania ani warunków produktowych przez zgadywanie. Pozycje bez aktualnego dokumentu źródłowego pozostają oznaczone jako `Not verified`.
