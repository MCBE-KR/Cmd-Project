playsound cmd.j2s3 @a[r=20] ~ ~ ~
playsound cmd.j2s3_start @a[r=20] ~ ~ ~

tag @s add target

scoreboard players set @s param1 231
scoreboard players set @s param2 0
scoreboard players set @s param3 80
scoreboard players set @s param4 2
scoreboard players set @s param5 10

tag @s add show_target
function show_particle

scoreboard players set @s param1 232
scoreboard players set @s param3 100
scoreboard players set @s param4 20

function show_particle
tag @s remove show_target

scoreboard players set @s param2 100
scoreboard players set @s param3 20
scoreboard players set @s param4 0
scoreboard players set @s param5 100

function play_sound
tag @s remove target

scoreboard players set @s param1 5
scoreboard players set @s param2 1
scoreboard players set @s param3 1
scoreboard players set @s param4 0

tag @s add tag_r_8_r_a_target_a_f_get_allies_f
tag @s add effect_speed
function give_buff
tag @s remove effect_speed

scoreboard players set @s param1 70
scoreboard players set @s param2 100
scoreboard players set @s param3 20
scoreboard players set @s param4 0
scoreboard players set @s param5 0

tag @s add healer
function heal_slow
tag @s remove tag_r_8_r_a_target_a_f_get_allies_f
tag @s remove healer

scoreboard players set @s param1 5
scoreboard players set @s param2 1
scoreboard players set @s param3 0
scoreboard players set @s param4 0

tag @s add effect_slowness
tag @s add tag_r_8_r_a_target_a_f_get_enemies_f
function give_buff
tag @s remove tag_r_8_r_a_target_a_f_get_enemies_f
tag @s remove effect_slowness

scoreboard players set @s param1 50
scoreboard players set @s param2 100
scoreboard players set @s param3 20
scoreboard players set @s param4 0
scoreboard players set @s param5 0

tag @s add attacker
tag @s add tag_r_8_r_a_target_a_f_get_enemies_f_tag_target_tag_a_victim_a_re_target_re
function damage_slow
tag @s remove tag_r_8_r_a_target_a_f_get_enemies_f_tag_target_tag_a_victim_a_re_target_re
tag @s remove attacker