tag @a remove nearest

execute @s[scores={team=1}] ~ ~ ~ tag @p[scores={team=2}] add nearest
execute @s[scores={team=2}] ~ ~ ~ tag @p[scores={team=1}] add nearest