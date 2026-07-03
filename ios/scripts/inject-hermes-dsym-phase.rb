#!/usr/bin/env ruby
# Inject a "Generate hermes.framework dSYM" Run-Script build phase into the
# Underdawgs target so App Store Connect uploads include the dSYM Hermes
# is missing. Run after `pod install`.
require 'xcodeproj'

project_path = File.expand_path('../Underdawgs.xcodeproj', __dir__)
project = Xcodeproj::Project.open(project_path)

phase_name = 'Generate hermes.framework dSYM'
target = project.targets.find { |t| t.name == 'Underdawgs' }
abort "Underdawgs target not found in #{project_path}" unless target

existing = target.shell_script_build_phases.find { |p| p.name == phase_name }
if existing
  target.build_phases.delete(existing)
end

phase = target.new_shell_script_build_phase(phase_name)
phase.shell_path = '/bin/bash'
phase.shell_script = '"${SRCROOT}/scripts/copy-hermes-dsym.sh"'
phase.show_env_vars_in_log = '0'
phase.always_out_of_date = '1'

project.save
puts "[hermes-dsym] Injected build phase '#{phase_name}' into Underdawgs target."
