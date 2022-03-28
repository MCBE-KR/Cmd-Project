tag @s add inited
playsound cmd.j1s1_spawn @a[r=20] ~ ~ ~ 1.0 3.0

summon cmd:mark ~ ~ ~
execute @p[tag=summoner] ~ ~ ~ tp @e[type=cmd:mark] ^ ^ ^10

tp ^ ^ ^-0.1 facing @e[type=cmd:mark]
tp ~ ~1 ~

event entity @e[type=cmd:mark] cmd:despawn

scoreboard players set @s projectile_life 6
scoreboard players operation @s team = @p[tag=summoner] team