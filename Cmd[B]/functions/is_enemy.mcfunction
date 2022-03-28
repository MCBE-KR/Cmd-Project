scoreboard players set @s result1 0

tag @s add self
execute @p[tag=target, scores={team=1}] ~ ~ ~ scoreboard players set @p[tag=self, scores={team=2}] result1 1
execute @p[tag=target, scores={team=2}] ~ ~ ~ scoreboard players set @p[tag=self, scores={team=1}] result1 1
tag @s remove self