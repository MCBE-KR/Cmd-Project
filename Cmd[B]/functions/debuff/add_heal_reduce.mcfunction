execute @p[tag=victim, scores={cc_resist=1..}] ~ ~ ~ function damage/reduce_cc

tag @s add self
execute @p[tag=victim, scores={heal_reduce=1..}] ~ ~ ~ execute @p[tag=self] ~ ~ ~ function debuff/compare_heal_reduce
tag @s remove self

scoreboard players add @p[tag=victim] heal_reduce 0
scoreboard players operation @p[tag=victim, scores={heal_reduce=0}] heal_reduce_lv = @s param2
scoreboard players operation @p[tag=victim, scores={heal_reduce=0}] heal_reduce = @s param1