execute @s[scores={team=1}] ~ ~ ~ tag @a[r=7,scores={team=1}] add target
execute @s[scores={team=2}] ~ ~ ~ tag @a[r=7,scores={team=2}] add target
scoreboard players set @s param1 250
function buff/add_shield
tag @a remove target

particle cmd:j1s3_upper ~ ~0.01 ~
particle cmd:j1s3_lower ~ ~0.01 ~
playsound cmd.j1s3 @a[r=20] ~ ~ ~ 1.0 1.2