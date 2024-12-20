import type { Kysely } from "kysely";
import type { Database } from "../../../src/db/types";
import { getRandomElement } from "../utils";
import { hashPassword } from "../../../src/auth/password";

const PASSWORD = "9gh2ngsl2t3slg";

const FIRST_NAMES = [
  "Fredrik",
  "Kasper",
  "Mikael",
  "Jesper",
  "Johan",
  "Anders",
  "Daniel",
  "Jonas",
  "Mats",
  "Magnus",
  "Hans",
  "Lars",
  "Simon",
  "David",
  "Erik",
  "Martin",
  "Jonatan",
  "Peter",
  "Niklas",
  "Christian",
  "Alexander",
  "Henrik",
  "Andreas",
  "Johannes",
  "Marcus",
  "Oscar",
  "Mathias",
  "Sebastian",
  "Filip",
  "Joakim",
  "Tobias",
  "Robert",
  "Emil",
  "Viktor",
  "Gustav",
  "Ida",
  "Emma",
  "Sara",
  "Anna",
  "Maria",
  "Johanna",
  "Elin",
  "Sofia",
  "Julia",
  "Lisa",
  "Emelie",
  "Caroline",
  "Hanna",
  "Malin",
  "Amanda",
  "Louise",
  "Frida",
  "Lina",
  "Jessica",
  "Isabelle",
  "Rebecca",
  "Linnea",
  "Sandra",
  "Maja",
  "Evelina",
  "Ellen",
  "Karin",
  "Cecilia",
  "Nathalie",
  "Erika",
  "Charlotte",
  "Camilla",
  "Victoria",
  "Linda",
  "Anneli",
  "Therese",
  "Kajsa",
  "Josefin",
  "Sanna",
  "Annika",
];

const LAST_NAMES = [
  "Hansen",
  "Johansen",
  "Olsen",
  "Larsen",
  "Andersen",
  "Pedersen",
  "Nilsen",
  "Kristiansen",
  "Jensen",
  "Karlsen",
  "Johnsen",
  "Pettersen",
  "Eriksen",
  "Bakken",
  "Sørensen",
  "Solberg",
  "Andresen",
  "Jacobsen",
  "Halvorsen",
  "Berntsen",
  "Lund",
  "Haugen",
  "Moen",
  "Iversen",
  "Strand",
  "Solheim",
];

export async function populateUsers(db: Kysely<Database>) {
  const toInsert = []
  for (const firstName of FIRST_NAMES) {
    const lastName = getRandomElement(LAST_NAMES);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const hashedPassword = await hashPassword(PASSWORD);
    console.log(`\x1b[36m${firstName} ${lastName} <${email}>\x1b[0m`);
    toInsert.push({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
  }

  // Log with color
  const users = await db
    .insertInto("user")
    .values(toInsert)
    .returningAll()
    .execute();

  console.log(
    JSON.stringify(
      users.map((user) => user.id),
      null,
      2,
    ),
  );
}
