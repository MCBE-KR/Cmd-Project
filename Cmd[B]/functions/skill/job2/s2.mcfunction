particle cmd:j2s2_area_damage ~ ~0.1 ~
particle cmd:j2s2_area_heal ~ ~0.1 ~
playsound cmd.j2s2 @a[r=20] ~ ~ ~

#데미지
tag @a[r=4] add target
function get_enemies

tag @s add attacker
tag @a[tag=target] add victim

scoreboard players set @s param1 125
function damage/damage

tag @s remove attacker
tag @a remove victim

tag @s add self
scoreboard players set @s temp1 0
execute @a[tag=target] ~ ~ ~ scoreboard players add @p[tag=self] temp1 1
tag @s remove self

execute @s[scores={temp1=1..}] ~ ~ ~ function skill/job2/s2_damage_line
tag @a remove target

# 회복
scoreboard players set @s param1 75
scoreboard players operation @s param1 *= @s temp1

tag @a[r=8] add target
function get_allies

tag @s add self
scoreboard players set @s temp1 0
execute @a[tag=target] ~ ~ ~ scoreboard players add @p[tag=self] temp1 1
scoreboard players operation @s param1 /= @s temp1
tag @s[scores={temp1=1..}] add make_line
tag @s remove self

tag @s add healer
function damage/heal
tag @s remove healer

execute @s[tag=make_line] ~ ~ ~ function skill/job2/s2_heal_line
tag @s remove make_line
tag @a remove target