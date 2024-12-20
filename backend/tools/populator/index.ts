import { Argument, program } from "commander";
import { createKysely } from "../../src/db";
import { populateComments } from "./scripts/comments";
import { populateUsers } from "./scripts/users";

program
  .name("populator")
  .description("CLI to populate database")
  .addArgument(
    new Argument("<action>", "Comments")
      .choices(["comments", "users"])
      .default("comments")
      .argOptional(),
  )
  .action(async (name: "comments" | "users") => {
    try {

      const db = createKysely();
  
      switch (name) {
        case "comments": {
          await populateComments(db);
          break;
        }
        case "users": {
          await populateUsers(db);
          break;
        }
      }
  
      process.exit();
    }
    catch (e) {
      console.error(e);
      process.exit(1);
    }
  });

program.parse();
