import { memo, useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../Text'
import { Stack } from '../Stack'
import { Divider } from '@ui-kitten/components'
import { Link } from '@react-navigation/native'
import { Button } from '../Button'

const InfoPrivacy = () => {
  const onPressLink = useCallback(
    () => window.open('https://www.infront.sport/it', '_blank'),
    [],
  )
  return (
    <View style={styles.wrapper}>
      <Stack gap={20}>
        <Stack flexDirection="column" gap={10}>
          <Text text="Informativa privacy" variant="h4" />
          <Text
            text="ai sensi dell’art. 13 e dell’art. 14 del Regolamento Generale Europeo
sulla protezione dei Dati Personali n. 2016/679 ('GDPR')"
            variant="h5"
            fontSize={20}
          />
          <Text
            text="Informativa Privacy versione aggiornata al 03 Agosto 2023"
            variant="p1"
            fontSize={12}
          />
        </Stack>

        <Text
          text="Lo scopo della presente Privacy Policy è quello di illustrare le modalità e le finalità per le quali verranno
raccolti, trattati ed utilizzati i dati personali degli utenti al fine di consentire la Sua partecipazione all’evento
sportivo (di seguito “Partita”) per cui ha acquistato il titolo d’accesso (di seguito “Titolo d’accesso”), nonché i
diritti che potrà esercitare in relazione al trattamento di tali dati."
        />
        <Divider style={{ backgroundColor: 'white' }} />
        <Text text="1. RESPONSABILE DEL TRATTAMENTO" variant="h6" />
        <Stack flexDirection="column" gap={10} alignItems="flex-start">
          <Text
            text={`Infront Italy S.p.A. (P.IVA. 12515360159), società con socio unico soggetta all’attività di direzione e
coordinamento di Infront Sports & Media AG, con sede legale in via Deruta 20, Milano (di seguito “Società”), è
il responsabile del trattamento dei dati sulla base di apposita nomina rilasciata dal titolare del trattamento
(società sportiva organizzatrice dell’evento).
\nPer maggiori informazioni sulla Società si prega di visitare il sito:`}
          />
          <Button
            onPress={onPressLink}
            style={{ cursor: 'pointer' }}
            variant="primary"
            title="https://www.infront.sport/it"
          />
        </Stack>
        <Text
          text="2. CATEGORIE DI DATI PERSONALI TRATTATI, FINALITÀ E
CONDIZIONI CHE GIUSTIFICANO IL TRATTAMENTO"
          variant="h6"
        />
        <Text
          text="La Società potrà trattare le seguenti categorie di dati, per gli scopi di seguito specificati.
La seguente tabella indica i dati personali che la Società raccoglie quando Lei richiede il Titolo d’accesso."
        />
        <Text text="Tipologia di dati: Dati di Comunicazione" variant="h6" />
        <Stack gap={10} paddingLeft={10} flexDirection="column">
          <Text text="Categoria dei dati trattati:" />
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text
              text="dati comuni identificativi (es. nome, cognome, e-mail, etc.) forniti da Lei per ottenere e usufruire del
Titolo d’accesso."
            />
          </Stack>
          <Text text="Finalità:" />
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text text={`partecipazione alla Partita;`} />
          </Stack>
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text text={`documentazione della corrispondenza;`} />
          </Stack>
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text text={`ulteriori finalità amministrative.`} />
          </Stack>
          <Text text="Base giuridica:" />
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text
              text={`il trattamento è necessario all’esecuzione di un contratto di cui l’utente è parte o all’esecuzione di
misure precontrattuali adottate su sua richiesta (art. 6, par. 1, lett. b) GDPR);`}
            />
          </Stack>
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text
              text="il trattamento è necessario per adempiere un obbligo legale al quale è soggetto il responsabile
(art. 6, par. 1, lett. c) GDPR);"
            />
          </Stack>
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text
              text="il trattamento è necessario per il perseguimento del legittimo interesse del responsabile o di terzi
(art. 6, par. 1, lett. f) GDPR) e gestire rapporto contrattuale"
            />
          </Stack>
        </Stack>
        <Text
          text="3. MODALITÀ DEL TRATTAMENTO E CONSERVAZIONE DEI DATI PERSONALI"
          variant="h6"
        />

        <Text
          text={`Il trattamento dei dati raccolti verrà effettuato nel rispetto dei principi di cui all’art. 5 del GDPR e, in particolare,
dei principi di liceità, correttezza e trasparenza, limitazione delle finalità, minimizzazione dei dati, esattezza,
limitazione della conservazione, integrità e riservatezza e responsabilizzazione.
\nIl trattamento per le finalità individuate avverrà con modalità informatiche e manuali, mediante strumenti
elettronici o supporti cartacei, in base a criteri logici funzionali alle finalità per cui i dati sono stati raccolti, nel
rispetto delle regole di riservatezza e di sicurezza previste dal GDPR e dalle relative norme di applicazione
nazionali. In ogni caso, ai sensi dell’art. 32 GDPR, la Società ha adottato tutte le misure di sicurezza adeguate
alla tutela dei dati personali, nonché prevenire i rischi che potrebbero derivare dal trattamento dei dati, come
la distruzione, la perdita e l’uso illecito dei dati, nonché l’accesso non autorizzato ad essi.
\nPer quanto riguarda la conservazione dei dati personali La informiamo che:`}
        />
        <Stack gap={10} paddingLeft={10}>
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text
              text="I dati di comunicazione saranno conservati per il tempo necessario per rispondere alle sue
richieste e per erogare i servizi ovvero per adempiere gli obblighi di legge o regolamentari
applicabili e comunque per il tempo necessario a garantire l'esercizio dei diritti della Società
e comunque per un periodo non maggiore a dieci anni."
            />
          </Stack>
        </Stack>
        <Text text="4. CON CHI CONDIVIDIAMO I SUOI DATI?" variant="h6" />
        <Text
          text={`La Società potrà trasmettere i dati raccolti a soggetti terzi e alle società sportive titolari del diritto di emettere il
Titolo d’accesso laddove ciò fosse necessario per perseguire le finalità del trattamento ovvero laddove
sussista un obbligo legale di comunicazione oppure laddove sia necessario in base alle Condizioni di accesso
agli impianti sportivi o in esecuzione di altri accordi in essere con l’utente o al fine di tutelare i diritti, i beni e la
sicurezza della Società o di terzi. Di conseguenza, i dati degli utenti potrebbero essere trasferiti in Paesi che
appartengono o sono al di fuori dell’Unione Europea. Tale trasferimento avverrà sulla base delle decisioni di
adeguatezza o delle altre garanzie appropriate.
\nTali soggetti terzi agiranno in qualità di responsabili esterni del trattamento ai sensi dell’art. 28 del GDPR.
\nI dati condivisi verranno trattati per le finalità di cui alla presente Privacy Policy o, se del caso, per le finalità
indicate in ulteriori informative che potranno essere fornite ai sensi degli artt. 13 o 14 del GDPR.`}
        />
        <Text text="5. FACOLTATIVITA’ DEL TRATTAMENTO" variant="h6" />
        <Text
          text={`La comunicazione dei Suoi dati personali in fase di registrazione è obbligatoria per accedere al servizio e
scaricare il Titolo d’accesso alla Partita.
\nIl loro mancato conferimento non consentirà alla Società ed ai loro partner commerciali consentirLe di
scaricare il Titolo d’accesso.`}
        />
        <Text text="6. I SUOI DIRITTI" variant="h6" />
        <Text
          text={`Ci impegniamo a mantenere i Suoi dati personali confidenziali e a garantirLe l’esercizio dei suoi diritti. La
informiamo che il responsabile garantisce l’esercizio dei suoi diritti che potrà esercitare senza addebito alcuno
e in qualunque momento inviando una mail all’indirizzo privacy.italy@infrontsports.com oppure scrivendo ad
Infront Italy all’indirizzo: Infront Italy S.p.A., via Deruta 20, Milano, segnalando semplicemente il motivo della
Sua richiesta e il diritto che intende esercitare.
\nIn particolare, a prescindere dalla finalità o dalla base giuridica in virtù della quale trattiamo i Suoi dati, può
esercitare i seguenti diritti:
`}
        />
        <Stack gap={10} paddingLeft={10} flexDirection="column">
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text
              text="sapere se il responsabile del trattamento detiene e/o tratta i suoi dati personali e, a tal fine, chiederci
l’accesso a tali dati anche ottenendone copia (art. 15 GDPR);"
            />
          </Stack>
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text
              text="chiederci di cancellare i Suoi dati personali in nostro possesso se sussiste uno dei motivi previsti dall’art. 17
GDPR;"
            />
          </Stack>
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text
              text="chiederci di interrompere o limitare il trattamento solo ad alcuni dati personali, se sussiste uno dei motivi
previsti dall’art. 18 GDPR;"
            />
          </Stack>
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text
              text="richiedere la portabilità dei dati ai sensi dell’art. 20 GDPR. Ciò significa che su Sua richiesta potrà ricevere i
dati personali che ci ha fornito in formato strutturato, di uso comune e leggibile dal computer, per poterli
trasmettere direttamente ad un’altra società, purché tecnicamente possibile;"
            />
          </Stack>
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text
              text="opporsi in tutto o in parte al trattamento dei dati personali che La riguardano, compresa la
profilazione, per finalità di invio di materiale pubblicitario e ricerche di mercato (art. 21 GDPR). Inoltre, potrà
opporsi al trattamento anche quando lo stesso si basa sul nostro interesse legittimo;"
            />
          </Stack>
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text
              text="Il diritto di revocare il Suo consenso, qualora prestato, in ogni momento, per una o più operazioni di
trattamento;"
            />
          </Stack>
          <Stack flexDirection="row" gap={10}>
            <Text text="•" />
            <Text
              text="chiedere copia del contratto di contitolarità in essere tra Infront Italy S.p.a. ed il Club ai sensi dell’art.26
comma 2 del GDPR."
            />
          </Stack>
        </Stack>
        <Text text="7. LIBERATORIA FOTO E VIDEO" variant="h6" />
        <Text
          text="Lei cede irrevocabilmente alla Società che accetta, il diritto di riprendere o far riprendere, con qualsiasi
strumento, gli eventuali interventi da Lei resi in occasione della sua partecipazione all'Evento nonché la sua
immagine, la sua voce, il suo nome, le sue dichiarazioni (di seguito complessivamente “Prestazioni”) e tutti i
diritti di sfruttamento economico di cui agli articoli 12, 13, 14, 15, 16, 17, 18, 18-bis della L. n. 633/1941 e
successive modifiche e integrazioni delle riprese aventi ad oggetto l'Evento, che Infront avrà diritto, ma non
obbligo, di sfruttare in ogni sede, forma e modo, in tutto o in parte, senza alcuna limitazione di tempo,
passaggi, lingua, e spazio, con facoltà di liberamente cedere a terzi senza necessità di Sua ulteriore
autorizzazione essendo la stessa con la presente espressamente confermata. A fronte delle Prestazioni e
della cessione dei diritti di cui sopra non avrà diritto a percepire alcun compenso in quanto è pienamente
soddisfatto della possibilità che Le è stata data di partecipare all'Evento e, pertanto, dichiara di non aver nulla
a pretendere, nei confronti di Infront e dei suoi aventi causa, a qualsiasi titolo, a tale riguardo"
        />

        <Text
          text="Infine, La informiamo che ha il diritto di inoltrare reclami al Garante sulla protezione dei dati personali, con
sede in Roma Piazza Venezia n. 11 - 00187, inviando una mail all’indirizzo protocollo@gpdp.it, chiamando al
numero 06.69677, oppure inviando un fax al numero 06696773785."
        />

        <Text text="8. MODIFICHE A QUESTA PRIVACY POLICY" variant="h6" />
        <Text
          text="Potremmo occasionalmente apportare modifiche a questa Privacy Policy.
In proposito si informa che, qualora dovessero essere sviluppati ed introdotti dei servizi nuovi e aggiuntivi tali
da comportare una modifica del modo in cui vengono raccolti o trattati i dati personali dell’utente, la presente
Privacy Policy verrà opportunamente aggiornata e, conseguentemente, gli utenti saranno debitamente
informati circa le diverse finalità e modalità di trattamento dei loro dati personali e, ove necessario, saranno
richiesti consensi al trattamento."
        />
      </Stack>
    </View>
  )
}

export default memo(InfoPrivacy)

const styles = StyleSheet.create({
  wrapper: {
    //backgroundColor: '#FFF',
    color: 'white',
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
  },
})
