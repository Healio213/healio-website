# GitHub Release Gate – noch nicht aktiviert

Der produktive Vercel-Build ist bereits fail-closed abgesichert. Zusätzlich ist ein GitHub-Workflow vorgesehen, der denselben vollständigen Build bereits vor einem Merge ausführt.

Die aktuelle GitHub-OAuth-Verbindung darf Workflow-Dateien nicht erstellen oder ändern (`workflow`-Berechtigung fehlt). Deshalb wird die Workflow-Datei nicht unbemerkt umgangen oder halb aktiviert. Nach Erweiterung der GitHub-Berechtigung wird ein `release-gate`-Workflow mit Node.js 24, `npm ci`, `npm run test:release-safety` und `npm run build` eingerichtet und als erforderlicher Branch-Check gesetzt.
