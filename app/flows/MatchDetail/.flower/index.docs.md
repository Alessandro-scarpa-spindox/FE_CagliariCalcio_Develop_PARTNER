# getReservations
## GET RESERVATIONS
Recupero informazioni prenotazione in base a evento e partner

```edges
--> checkReservationStatus
```

# checkReservationStatus
## CHECK RESERVATION STATUS
Verifico lo stato delle prenotazioni

```edges
--> eventDetail
--> checkEvent
```

# eventDetail
## MATCH DETAIL
Visualizzazione del dettaglio di un match

```edges
--> getSpaces
```

# getSpaces
## GET SPACES
Recupero tutti gli spazi

```edges
--> formGuests
```

# formGuests
## EDIT OSPITI
Form di inserimento o modifica lista ospiti

```edges
--> checkEventPartnerLounge
--> getGuestsPreviousEvent
```

# checkEventPartnerLounge
```edges
--> checkEventExists
```

# getGuestsPreviousEvent



# checkEventExists
```edges
--> errorCheckEventExists
--> QRCODE
```

# QRCODE



# errorCheckEventExists



# checkreservationstatus
## GET RESERVATIONS
Recupero informazioni prenotazione in base a evento e partner

<FlowerNode id="getreservations" />

# eventdetail
## MATCH DETAIL
Visualizzazione del dettaglio di un match

# eventnotavailable



# getspaces
## GET SPACES
Recupero tutti gli spazi

# formguests
## EDIT OSPITI
Form di inserimento o modifica lista ospiti

# qrcode



# checkevent



