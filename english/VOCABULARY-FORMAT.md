# Vokabel-Format Dokumentation

## Übersicht

Der dynamische Vokabeltrainer verwendet ein einfaches Markdown-Format für Vokabellisten. Diese Dokumentation erklärt das korrekte Format und häufige Fehler.

## Korrektes Format

### Grundstruktur

```markdown
// Vokabel-Datenbank
//
// Hier können neue Vokabeln hinzugefügt werden.
// Format: "- Fremdwort : Übersetzung"
// Neue Kategorien starten mit "##".
// Kommentarzeilen starten mit "//".

## Kategorie Name
- Wort1 : Übersetzung1
- Wort2 : Übersetzung2
- Wort3 : Übersetzung3

## Weitere Kategorie
- Wort4 : Übersetzung4
```

### Wichtige Regeln

1. **Kategorien** starten mit `##` gefolgt von einem Leerzeichen und dem Kategorienamen
   - ✅ `## Scratch`
   - ✅ `## Familie und Freunde`
   - ❌ `##Scratch` (kein Leerzeichen)

2. **Vokabeleinträge** starten mit `-` gefolgt von einem Leerzeichen
   - ✅ `- modulo : Rest berechnen`
   - ❌ `modulo : Rest berechnen` (fehlt `-`)
   - ❌ `-modulo : Rest berechnen` (fehlt Leerzeichen nach `-`)

3. **Trennzeichen** ist ein Doppelpunkt `:` (Leerzeichen darum sind optional aber empfohlen)
   - ✅ `- Wort : Übersetzung` (mit Leerzeichen - empfohlen)
   - ✅ `- Wort: Übersetzung` (ohne Leerzeichen - funktioniert auch)
   - ❌ `- Wort Übersetzung` (fehlt Doppelpunkt)

4. **Leere Zeilen** zwischen Kategorien und Einträgen sind erlaubt und werden ignoriert

5. **Kommentarzeilen** mit `//` am Anfang sind erlaubt und werden ignoriert
   - ✅ `// Dies ist ein Kommentar`
   - ✅ `// Format: "- Wort : Bedeutung"`
   - Kommentarzeilen sind ideal für Beschreibungen und Hinweise am Anfang der Datei

## Häufige Fehler

### Fehler 1: Fehlender Bindestrich

❌ **Falsch:**
```markdown
## Leute
Jonte_der_Baumeister: the one and only Jonte
```

✅ **Richtig:**
```markdown
## Leute
- Jonte_der_Baumeister : the one and only Jonte
```

**Fehlermeldung:** "Zeile beginnt nicht mit '-' (sollte eine Vokabel sein) oder '##' (neue Kategorie)"

### Fehler 2: Fehlender Doppelpunkt

❌ **Falsch:**
```markdown
- Hello Hallo
```

✅ **Richtig:**
```markdown
- Hello : Hallo
```

**Fehlermeldung:** "Fehlt Doppelpunkt (:) zur Trennung von Fremdwort und Übersetzung"

### Fehler 3: Leeres Wort oder Übersetzung

❌ **Falsch:**
```markdown
- : Übersetzung ohne Wort
- Wort ohne Übersetzung :
```

✅ **Richtig:**
```markdown
- Wort : Übersetzung
```

**Fehlermeldung:** "Fremdwort (vor dem Doppelpunkt) ist leer" oder "Übersetzung (nach dem Doppelpunkt) ist leer"

## Validierung nutzen

### Im Editor

1. Öffne den **Config**-Tab
2. Bearbeite deine Vokabeln
3. Klicke auf **"Validieren"** um zu prüfen, ob alles korrekt ist
4. Wenn Fehler gefunden werden, siehst du eine Liste mit:
   - Zeilennummer
   - Problemzeile
   - Beschreibung des Fehlers

### Beim Speichern

- Das System validiert automatisch beim Klick auf **"Speichern & Laden"**
- Wenn Fehler vorhanden sind, wird NICHT gespeichert
- Du siehst eine Liste aller Fehler zum Korrigieren

### Beim Teilen

- Das System validiert automatisch beim Klick auf **"Teilen"**
- Nur valide Konfigurationen können geteilt werden
- Dies verhindert, dass ungültige Listen verbreitet werden

## Beispiel: Vollständige valide Liste

```markdown
// Vokabel-Datenbank
//
// Hier können neue Vokabeln hinzugefügt werden.
// Format: "- Fremdwort : Übersetzung"
// Neue Kategorien starten mit "##".
// Kommentarzeilen starten mit "//".

## Scratch
- modulo : Rest berechnen
- Lager : Ort wo man Dinge zwischen Projekten teilen kann
- Nachrichten : Zeitgleiche Dinge ablaufen lassen
- Sprite : Kostüme auf Englisch in Scratch
- MIT : Massachusetts Institute of Technology
- scratch.mit.edu : Webseite von Scratch
- unser Yopad : https://yopad.eu/p/lessing

## Lessing
- Frau Hennek : Unsere Mediencentrum Freundin

## Leute
- Jonte_der_Baumeister : the one and only Jonte
```

## Tipps

1. **Verwende Leerzeichen um den Doppelpunkt** für bessere Lesbarkeit
2. **Gruppiere ähnliche Vokabeln** in passenden Kategorien
3. **Nutze die Validierung** vor dem Speichern oder Teilen
4. **URLs und Sonderzeichen** sind in Übersetzungen erlaubt
5. **Mehrere Doppelpunkte** in der Übersetzung sind ok (z.B. für URLs)

## Fehlerbehebung

Wenn du Validierungsfehler siehst:

1. Schau dir die **Zeilennummer** an
2. Lies die **Fehlermeldung** sorgfältig
3. Vergleiche deine Zeile mit den **Beispielen oben**
4. Korrigiere den Fehler
5. Klicke erneut auf **"Validieren"** um zu prüfen

Bei Problemen kannst du auch auf **"Standard wiederherstellen"** klicken, um zur Standardkonfiguration zurückzukehren.
