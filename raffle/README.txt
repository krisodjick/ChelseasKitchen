RESTORING ALGONQUIN PRESENCE RAFFLE PAGE

Upload index.html and raffle-data.json into the same /raffle/ folder on your website.

TO UPDATE THE PAGE:
Only edit raffle-data.json.

1. Add your Square payment link to paymentUrl.
2. Add a contact/form link to contactUrl if desired.
3. Add each new prize inside the prizes list.

Example prize:
{
  "name": "$100 Grocery Gift Card",
  "donor": "Example Business",
  "value": 100
}

The webpage automatically calculates the current total from all prize values.
You do NOT need to edit index.html when adding prizes.

Important: keep JSON punctuation exactly valid. Every prize except the last one needs a comma after its closing }.
