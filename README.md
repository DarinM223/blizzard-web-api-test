My implementation of the Blizzard Web API Take Home Test

------------------------------
Blizzard Entertainment
Platform Services
Web API Take Home Test
3/1/2015
------------------------------

We would like you to create an API that allows management of a World of WarCraft player's characters. The API should expose methods over a RESTful HTTP interface that uses the features of HTTP appropriately.  The API should expose methods to do the following:

•         Create an account 
•         Add a character to an account
•         Mark a character as deleted / undeleted 
•         Get a list of characters


These APIs can be designed however you think would be best for the consumer.  A character has the following properties:
•         Name
•         Level (1 – 85)
•         Race (Orc, Tauren, Blood Elf, Human, Gnome, Worgen)
•         Class (Warrior, Druid, Death Knight, Mage)
•         Faction (Horde, Alliance)

Rules:
•         Orc, Tauren, and Blood Elf races are exclusively Horde.
•         Human, Gnome, and Worgen races are exclusively Alliance.
•         Only Taurens and Worgen can be Druids.
•         Blood Elves cannot be Warriors.
•         A player can only have all Horde or all Alliance active characters.
•         A player should be able to delete and undelete characters.

Technical Requirements:

•         Provide source code used in your solution
•         You must provide a URL with this web service running & match the RESTful interface defined below:

•         GET {your-service-url}/about
                 returns 200 with body of:
                 { "author" : "Jon Doe Applicant", "source" : "/relative/path/to/source/code.language" }

•         POST {your-service-url}/account
                  { "name" : "testaccount" }
                  returns 200 with body of:
                  { "account_id" : 1234 }


•         GET {your-service-url}/account
                  returns 200 with body of (all accounts):
                  { "accounts" : [ { "account_id" : 1234, "account_name" : "blah", "link" : "{your-service-url}/account/blah" }, ... ] }

•         POST {your-service-url}/account/{account_name}/characters
                  { "name" : "Lochtar", "race" : "Orc", "class" : "Druid", "faction" : "Alliance", "level" : 90 }
                  returns 200 with body of:
                  { "character_id" : 1234 }


•         DELETE {your-service-url}/account/{account_name}
                  returns 200

•         DELETE {your-service-url}/account/{account_name}/characters/{character_name}
                  returns 200

•         GET {your-service-url}/account/{account_name}/characters
                  returns 200 with body of:
                  { "account_id" : 1234, "characters" : [ { "character_id" : 1234, "name" : "Lochtar", "race" : "Orc", "class" : "Druid", "faction" : "Alliance", "level" : 90 } ] }

You CAN add additional fields to the return body


Bonus Points:
•         Make the entire server asynchronous / non-blocking
