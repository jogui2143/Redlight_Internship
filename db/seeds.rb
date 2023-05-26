# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

applicants = Applicant.create([
    {name: "Eric Cartman", email: "eric@gmail.com", phone: "1234567890"},
    {name: "Stan Marsh", email: "stan@gmail.com", phone: "098765322"},
    {name: "Kyle Broflovski", email: "kyle@gmail.com", phone: "123412340"}
])

applicants.first.avatar.attach(io: File.open(Rails.root.join('public', 'eric.webp')), filename: 'eric.webp')
applicants.second.avatar.attach(io: File.open(Rails.root.join('public', 'stan.png')), filename: 'stan.png')
applicants.third.avatar.attach(io: File.open(Rails.root.join('public', 'kyle.jpeg')), filename: 'kyle.jpeg')

roles = Role.create([
    {name: "Frontend"},
    {name: "Backend"},
    {name: "Design"}
])

ApplicantsRole.create([
    {applicant_id: applicants.first.id, role: roles.first},
    {applicant_id: applicants.first.id, role: roles.second},
    {applicant_id: applicants.second.id, role: roles.second},
    {applicant_id: applicants.third.id, role: roles.third}
])