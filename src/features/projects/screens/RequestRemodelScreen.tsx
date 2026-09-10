import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import {
  Button,
  Card,
  Chip,
  Input,
  Row,
  Screen,
  Text,
  contentMaxWidth,
  spacing,
} from '@/design-system';
import { strings } from '@/i18n';
import type { ProjectsStackScreenProps } from '@/app/navigation/types';

import { useCreateRemodelRequest } from '../hooks/useProjects';
import { BudgetRange, PreferredTiming, RemodelType } from '../types';

const TYPE_OPTIONS: { value: RemodelType; label: string }[] = [
  { value: 'kitchen', label: strings.requestRemodel.typeKitchen },
  { value: 'bathroom', label: strings.requestRemodel.typeBathroom },
  { value: 'living_room', label: strings.requestRemodel.typeLivingRoom },
  { value: 'bedroom', label: strings.requestRemodel.typeBedroom },
  { value: 'full_home', label: strings.requestRemodel.typeFullHome },
  { value: 'commercial', label: strings.requestRemodel.typeCommercial },
  { value: 'facade', label: strings.requestRemodel.typeFacade },
  { value: 'other', label: strings.requestRemodel.typeOther },
];

const BUDGET_OPTIONS: { value: BudgetRange; label: string }[] = [
  { value: 'under_10m', label: strings.requestRemodel.budgetUnder10m },
  { value: '10m_30m', label: strings.requestRemodel.budget10to30m },
  { value: '30m_60m', label: strings.requestRemodel.budget30to60m },
  { value: 'over_60m', label: strings.requestRemodel.budgetOver60m },
  { value: 'unsure', label: strings.requestRemodel.budgetUnsure },
];

const TIMING_OPTIONS: { value: PreferredTiming; label: string }[] = [
  { value: 'this_week', label: strings.requestRemodel.timingThisWeek },
  { value: 'next_week', label: strings.requestRemodel.timingNextWeek },
  { value: 'this_month', label: strings.requestRemodel.timingThisMonth },
  { value: 'flexible', label: strings.requestRemodel.timingFlexible },
];

export function RequestRemodelScreen({
  navigation,
}: ProjectsStackScreenProps<'RequestRemodel'>) {
  const [client, setClient] = useState('');
  const [remodelType, setRemodelType] = useState<RemodelType | null>(null);
  const [location, setLocation] = useState('');
  const [sizeM2, setSizeM2] = useState('');
  const [budgetRange, setBudgetRange] = useState<BudgetRange | null>(null);
  const [description, setDescription] = useState('');
  const [preferredTiming, setPreferredTiming] =
    useState<PreferredTiming>('flexible');
  const [touched, setTouched] = useState(false);

  const mutation = useCreateRemodelRequest();

  const clientError =
    touched && !client.trim()
      ? strings.requestRemodel.requiredClient
      : undefined;
  const locationError =
    touched && !location.trim()
      ? strings.requestRemodel.requiredLocation
      : undefined;
  const typeError =
    touched && !remodelType ? strings.requestRemodel.requiredType : undefined;

  const canSubmit = !!client.trim() && !!location.trim() && !!remodelType;

  const onSubmit = () => {
    setTouched(true);
    if (!canSubmit || !remodelType) return;

    const size = Number(sizeM2.replace(',', '.'));

    mutation.mutate(
      {
        client: client.trim(),
        remodelType,
        location: location.trim(),
        sizeM2: Number.isFinite(size) && size > 0 ? size : undefined,
        budgetRange: budgetRange ?? undefined,
        description: description.trim() || undefined,
        preferredTiming,
      },
      {
        onSuccess: () => {
          Alert.alert(
            strings.requestRemodel.successTitle,
            strings.requestRemodel.successBody,
          );
          navigation.goBack();
        },
      },
    );
  };

  return (
    <Screen scroll contentStyle={styles.content}>
      <View style={styles.column}>
        <Text variant="body" color="textSecondary" style={styles.subtitle}>
          {strings.requestRemodel.subtitle}
        </Text>

        <Card style={styles.section}>
          <Text variant="label" color="accent">
            1. {strings.requestRemodel.sectionType}
          </Text>
          <Row gap="sm" wrap style={styles.chips}>
            {TYPE_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                selected={remodelType === opt.value}
                onPress={() => setRemodelType(opt.value)}
              />
            ))}
          </Row>
          {typeError ? (
            <Text variant="caption" color="danger">
              {typeError}
            </Text>
          ) : null}
        </Card>

        <Card style={styles.section}>
          <Text variant="label" color="accent">
            2. {strings.requestRemodel.sectionProject}
          </Text>
          <Input
            label={strings.requestRemodel.clientLabel}
            placeholder={strings.requestRemodel.clientPlaceholder}
            value={client}
            onChangeText={setClient}
            onBlur={() => setTouched(true)}
            error={clientError}
          />
          <Input
            label={strings.requestRemodel.locationLabel}
            placeholder={strings.requestRemodel.locationPlaceholder}
            value={location}
            onChangeText={setLocation}
            onBlur={() => setTouched(true)}
            error={locationError}
          />
          <Input
            label={strings.requestRemodel.sizeLabel}
            placeholder={strings.requestRemodel.sizePlaceholder}
            value={sizeM2}
            onChangeText={setSizeM2}
            keyboardType="numeric"
            inputMode="numeric"
          />
        </Card>

        <Card style={styles.section}>
          <Text variant="label" color="accent">
            3. {strings.requestRemodel.sectionBudget}
          </Text>
          <View style={styles.field}>
            <Text variant="label" color="textSecondary">
              {strings.requestRemodel.budgetLabel}
            </Text>
            <Row gap="sm" wrap style={styles.chips}>
              {BUDGET_OPTIONS.map((opt) => (
                <Chip
                  key={opt.value}
                  label={opt.label}
                  selected={budgetRange === opt.value}
                  onPress={() => setBudgetRange(opt.value)}
                />
              ))}
            </Row>
          </View>
          <Input
            label={strings.requestRemodel.descriptionLabel}
            placeholder={strings.requestRemodel.descriptionPlaceholder}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
            style={styles.textarea}
          />
        </Card>

        <Card style={styles.section}>
          <Text variant="label" color="accent">
            4. {strings.requestRemodel.sectionTiming}
          </Text>
          <Row gap="sm" wrap style={styles.chips}>
            {TIMING_OPTIONS.map((opt) => (
              <Chip
                key={opt.value}
                label={opt.label}
                selected={preferredTiming === opt.value}
                onPress={() => setPreferredTiming(opt.value)}
              />
            ))}
          </Row>
        </Card>

        {mutation.isError ? (
          <Text variant="caption" color="danger">
            {strings.requestRemodel.error}
          </Text>
        ) : null}

        <Button
          title={
            mutation.isPending
              ? strings.requestRemodel.submitting
              : strings.requestRemodel.submit
          }
          onPress={onSubmit}
          loading={mutation.isPending}
          disabled={mutation.isPending}
          fullWidth
          size="lg"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { alignItems: 'center' },
  column: { width: '100%', maxWidth: contentMaxWidth, gap: spacing.lg },
  subtitle: { marginBottom: spacing.xs },
  section: { gap: spacing.lg },
  field: { gap: spacing.sm },
  chips: { marginTop: spacing.xs },
  textarea: { minHeight: 88, textAlignVertical: 'top' },
});
