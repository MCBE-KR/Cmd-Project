scoreboard players operation @a team -= @s team
tag @p[scores={team=0, job=1}] add attacker
scoreboard players operation @a team += @s team

scoreboard players set @p[tag=attacker] param1 50
execute @p[tag=attacker] ~ ~ ~ function damage/damage

scoreboard players set @p[tag=attacker] param1 40
execute @p[tag=attacker] ~ ~ ~ function debuff/add_stun

playsound conduit.attack @a[r=20] ~~~ 1.0 2.6
playsound cmd.j1s2_damage @a[r=20] ~~~ 1.5 2.0
execute @p[tag=victim] ~ ~ ~ particle cmd:j1s2_hit

tag @a remove victim
tag @a remove attacker

function skill/job1/s2_hit